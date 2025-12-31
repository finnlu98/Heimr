import "dotenv/config";
import express from "express";
import { Routes } from "./Router/Routes";
import cors from "cors";
import { sessionMiddleware } from "./Lib/session";

class Server {
  constructor() {
    const app = express();
    const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
    app.use(cors());
    app.use(express.json());
    app.use(sessionMiddleware);
    const router = new Routes(app);
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
}

new Server();
