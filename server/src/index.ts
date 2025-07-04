import "dotenv/config";
import express from "express";
import path from "path";
import fs from "fs";
import bodyParser from "body-parser";
import { initializeDatabases } from "./db";
import { logToFile } from "./utils/logger";
import userApi from "./api/userApi";
import dataApi from "./api/dataApi";
import fileApi from "./api/fileApi";
import siteApi from "./api/siteApi";

const SERVER_PORT = 3000;

const init = async () => {
  await initializeDatabases();

  console.log("启动服务器...");
  const app = express();
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    const now = new Date();
    const getClientIp = (req: express.Request): string => {
      // 1. 尝试从 X-Forwarded-For 获取
      const xForwardedFor = req.headers["x-forwarded-for"];
      if (typeof xForwardedFor === "string") {
        return xForwardedFor.split(",")[0].trim();
      }

      // 2. 尝试从 X-Real-IP 获取
      if (req.headers["x-real-ip"]) {
        return Array.isArray(req.headers["x-real-ip"])
          ? req.headers["x-real-ip"][0]
          : req.headers["x-real-ip"];
      }

      // 3. 回退到 socket 地址
      return req.socket.remoteAddress || "";
    };

    const ip = getClientIp(req);

    const logMsg = `[${now.toLocaleString("zh-CN", { hour12: false })}] ${req.method} ${
      req.originalUrl
    } | ${ip}`;
    console.log(logMsg);
    logToFile(logMsg);
    next();
  });

  // 中间件
  app.use(express.json());

  app.use("/site/api/", siteApi);
  app.use("/site/img", express.static(path.join(__dirname, "../assets")));
  app.use("/site", express.static(path.join(__dirname, "../site")));

  app.use("/admin/api/user", userApi);
  app.use("/admin/api/data", dataApi);
  app.use("/admin/api/file", fileApi);
  app.use("/admin/img", express.static(path.join(__dirname, "../assets")));
  app.use("/admin", express.static(path.join(__dirname, "../admin")));
  app.get("/admin/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin/index.html"));
  });

  // 启动服务器
  app.listen(SERVER_PORT, () => {
    console.log(`服务器启动成功！端口: ${SERVER_PORT}`);
  });
};

init();
