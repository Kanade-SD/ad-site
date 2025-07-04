import jwt from "jsonwebtoken";

// 引入环境变量
const SECRET = process.env.APP_SECRET as string;

export const signToken = (payload: object, expiresIn?: number) => {
  return jwt.sign(payload, SECRET, { expiresIn: expiresIn ?? "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};
