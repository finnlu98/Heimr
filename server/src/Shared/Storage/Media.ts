import express from "express";
import path from "path";
import { StoragePath } from "./StoragePath";

export function registerMediaRoute(app: express.Express) {
  const mediaRoot = path.join(process.cwd(), StoragePath.StorageRoot);
  app.use(
    `/${StoragePath.MediaEndpoint}`,
    express.static(mediaRoot, {
      maxAge: "365d",
      immutable: true,
      setHeaders: (res) => {
        res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
      },
    }),
  );
}
