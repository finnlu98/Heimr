import "dotenv/config";
import express from "express";
import { Routes } from "./Router/Routes";
import cors from "cors";
import { sessionMiddleware } from "./Lib/session";
import { registerMediaRoute } from "./Shared/Storage/Media";
import { globalLimiter } from "./Shared/RateLimiting/Limiters";

class Server {
  constructor() {
    const app = express();
    app.set("trust proxy", true);
    const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
    app.use(
      cors({
        origin: [process.env.FRONTEND_URL || "http://localhost:3000", "http://192.168.50.54:3000"],
        credentials: true,
      }),
    );
    app.use(express.json());
    registerMediaRoute(app);
    app.use(sessionMiddleware);
    app.use(async (req, res, next) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      next();
    });
    app.use(globalLimiter);
    const router = new Routes(app);
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
}

new Server();
