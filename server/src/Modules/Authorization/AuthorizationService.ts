import prisma from "../../Lib/prisma";
import { generateToken, hashToken } from "./AuthTokens";

export default class AuthorizationService {
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
}
