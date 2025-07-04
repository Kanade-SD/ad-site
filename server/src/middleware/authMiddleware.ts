import { Request, Response, NextFunction, RequestHandler } from "express";
import { fail } from "../utils/response";
import { verifyToken } from "../utils/jwt";

export const authMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace(/^Bearer\s/, "");
  if (!token) {
    res.status(401).json(fail("未认证", 401));
    return;
  }
  try {
    const user = verifyToken(token);
    next();
  } catch {
    res.status(401).json(fail("token无效或已过期", 401));
    return;
  }
};

interface TokenPayload {
  id: string;
  username: string;
  role: string;
  // 其他字段
}
export const getTokenData = (req: Request): TokenPayload | null => {
  const token = req.headers.authorization?.replace(/^Bearer\s/, "");
  if (!token) return null;
  try {
    return verifyToken(token) as TokenPayload;
  } catch {
    return null;
  }
};
