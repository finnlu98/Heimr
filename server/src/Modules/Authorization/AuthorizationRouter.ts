import prisma from "../../Lib/prisma";
import BaseRouter from "../Common/BaseRouter";
import AuthorizationService from "./AuthorizationService";
import { generateToken, hashToken } from "./AuthTokens";

export default class AuthorizationRouter extends BaseRouter {
  private authorizationService: AuthorizationService;
  constructor() {
    super("/auth");
    this.authorizationService = new AuthorizationService();
    this.setRoute();
  }

  setRoute(): void {
    this.route.post(`${this.subRoute}/invite`, async (req, res) => {
      if (req.header("x-admin-key") !== process.env.ADMIN_KEY) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const emailRaw = String(req.body?.email ?? "");
      const email = emailRaw.trim().toLowerCase();
      if (!email.includes("@"))
        return res.status(400).json({ error: "Invalid email" });

      var invite = await this.authorizationService.generateInvite(email);
      console.log("MAGIC LINK:", invite);
      return res.status(200).json({ message: "Invite created", link: invite });
    });

    this.route.post(`${this.subRoute}/magic/consume`, async (req, res) => {
      const token = String(req.body?.token ?? "");
      if (!token) return res.status(400).json({ error: "Missing token" });

      const result = await this.authorizationService.consumeMagicToken(token);

      if (!result.success) {
        const status = result.error === "User disabled" ? 403 : 401;
        return res.status(status).json({ error: result.error });
      }

      (req.session as any).userId = result.userId;
      return res.json({ user: { email: result.email } });
    });

    this.route.post(`${this.subRoute}/login`, async (req, res) => {
      const { email } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: "Invalid email" });
      }

      if (user.status !== "active") {
        return res.status(403).json({ error: "User disabled" });
      }

      (req.session as any).userId = user.id;
      return res.json({
        user: { email: user.email },
      });
    });

    this.route.post(`${this.subRoute}/logout`, (req, res) => {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: "Failed to logout" });
        }
        res.clearCookie("heimr.sid");
        return res.status(200).json({ message: "Logged out" });
      });
    });

    this.route.get(`${this.subRoute}/me`, async (req, res) => {
      const userId = (req.session as any).userId;
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.json({ user: { email: user.email } });
    });
  }
}
