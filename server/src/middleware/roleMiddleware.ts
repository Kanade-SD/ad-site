import { Request, Response, NextFunction } from "express";
import { fail } from "../utils/response";
import { getTokenData } from "./authMiddleware";

/**
 * 角色权限中间件
 * @param roles 允许的角色数组
 */
export function roleMiddleware(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const tokenData = getTokenData(req);
    if (!tokenData || !roles.includes(tokenData.role)) {
      return res.status(403).json(fail("无权限", 403));
    }
    next();
  };
}
