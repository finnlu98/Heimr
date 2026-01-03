import prisma from "../../Lib/prisma";
import { StorageService } from "../../Shared/Storage/StorageService";
import { generateToken, hashToken } from "./AuthTokens";
import path from "path";
import { StoragePath } from "../../Shared/Storage/StoragePath";
import { Home, User } from "../../generated/prisma";

export default class AuthorizationService {
  private storageService: StorageService;
  constructor() {
    this.storageService = new StorageService(
      path.join(process.cwd(), StoragePath.StorageRoot),
      `/${StoragePath.MediaEndpoint}`,
    );
  }

  async generateInvite(email: string): Promise<string> {
    const user = await prisma.user.upsert({
      where: { email },
      update: { status: "invited" },
      create: { email, status: "invited", created_at: new Date() },
    });

    const token = generateToken();
    const tokenHash = hashToken(token);

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days (login link)
    await prisma.loginTokens.create({
      data: {
        user_id: user.id,
        token_hash: tokenHash,
        purpose: "invite",
        expires_at: expiresAt,
        created_at: new Date(),
      },
    });

    return `${process.env.FRONTEND_ORIGIN}/auth/magic?token=${encodeURIComponent(token)}`;
  }

  async consumeMagicToken(token: string): Promise<{
    success: boolean;
    error?: string;
    userId?: string;
    email?: string;
  }> {
    const tokenHash = hashToken(token);

    const record = await prisma.loginTokens.findUnique({
      where: { token_hash: tokenHash },
      include: { user: true },
    });

    if (!record) {
      return { success: false, error: "Invalid token" };
    }

    if (record.used_at) {
      return { success: false, error: "Token already used" };
    }

    if (record.expires_at.getTime() < Date.now()) {
      return { success: false, error: "Token expired" };
    }

    const user = record.user;

    if (user.status === "disabled") {
      return { success: false, error: "User disabled" };
    }

    await prisma.loginTokens.update({
      where: { id: record.id },
      data: { used_at: new Date() },
    });

    if (user.status !== "active") {
      await prisma.user.update({
        where: { id: user.id },
        data: { status: "active" },
      });
    }

    return { success: true, userId: user.id, email: user.email };
  }

  async uploadImage(file: Express.Multer.File, storePath: string): Promise<string> {
    const ext = this.storageService.getMimeTypeExtension(file.mimetype);
    const key = this.storageService.imageKey(storePath, ext);
    const stored = await this.storageService.uploadImage(key, {
      data: file.buffer,
      contentType: file.mimetype,
      filename: file.originalname,
    });
    return stored.key;
  }

  async updatePersonalia(userId: string, name?: string, file?: Express.Multer.File): Promise<Partial<User>> {
    const updateData: { name?: string; avatar_img_key?: string } = {};

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    if (file) {
      updateData.avatar_img_key = await this.uploadImage(file, StoragePath.UserPath);
      if (user.avatar_img_key) {
        await this.storageService.removeImage(user.avatar_img_key);
      }
    }

    if (name) {
      updateData.name = name;
    }

    if (Object.keys(updateData).length > 0) {
      const res = await prisma.user.update({
        where: { id: userId },
        data: updateData,
      });

      return res;
    }

    return user;
  }

  async getUserHome(userId: any): Promise<Home | null> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    if (!user?.home_id) {
      return null;
    }

    return prisma.home.findFirst({
      where: { id: user.home_id },
    });
  }
}
