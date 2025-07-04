import bcrypt from "bcryptjs";

// 内容加密
export const encryptContent = async (content: string) => {
  return await bcrypt.hash(content, 10);
};

export const decryptContent = async (content: string, hash: string) => {
  return await bcrypt.compare(content, hash);
};
