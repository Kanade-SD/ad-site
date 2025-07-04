import fs from "fs";
import path from "path";

// 日志文件路径
const logDir = path.resolve(process.cwd(), "logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

export const logToFile = (message: string) => {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const logFile = path.join(logDir, `${dateStr}.log`);
  fs.appendFileSync(logFile, message + "\n", { encoding: "utf8" });
};
