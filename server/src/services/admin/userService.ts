import { adminDb } from "../../db";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { RoleType } from "../../types/roleType";
import { chain } from "lodash";
import { decryptContent, encryptContent } from "../../utils/utils";

export const getAllUsers = async () => {
  await adminDb.read();
  const users = adminDb.chain
    .get("users")
    .map((user) => ({
      id: user.id,
      username: user.username,
      role: user.role,
    }))
    .value();
  return users;
};

export const getUserInfo = async (id: string) => {
  await adminDb.read();
  const user = adminDb.chain.get("users").find({ id }).value();
  if (!user) throw new Error("用户不存在");
  const { password, ...userInfo } = user;
  return userInfo;
};

export const addUser = async (username: string, password: string, role: RoleType) => {
  await adminDb.read();
  if (adminDb.chain.get("users").find({ username }).value()) {
    throw new Error("用户名已存在");
  }
  const id = uuidv4();
  const hashedPassword = await encryptContent(password);
  adminDb.chain.get("users").push({ id, username, password: hashedPassword, role }).value();
  await adminDb.write();
  return id;
};

export const deleteUser = async (id: string) => {
  await adminDb.read();
  const users = adminDb.chain.get("users").value() || [];

  const user = users.find((u) => u.id === id);
  console.log(id, user);
  if (!user) {
    throw new Error("用户不存在");
  }

  const adminUsers = users.filter((u) => u.role === "admin");
  if (
    user.role === "admin" && // 要删除的是管理员
    adminUsers.length === 1 // 系统只剩一个管理员
  ) {
    throw new Error("系统至少需要保留一名管理员");
  }

  adminDb.chain
    .get("users")
    .remove((u) => u.id === id)
    .value();
  await adminDb.write();
};

export const loginUser = async (username: string, password: string) => {
  await adminDb.read();
  const user = adminDb.chain.get("users").find({ username }).value();
  if (!user) {
    throw new Error("用户名或密码错误");
  }
  const isMatch = await decryptContent(password, user.password);
  if (!isMatch) {
    throw new Error("用户名或密码错误");
  }
  // 登录成功返回用户信息（可去除密码字段）
  const { password: _, ...userInfo } = user;
  return userInfo;
};

// 修改密码
export const updatePassword = async (id: string, password: string) => {
  await adminDb.read();
  const user = adminDb.chain.get("users").find({ id }).value();
  if (!user) {
    throw new Error("用户不存在");
  }
  const hashedPassword = await encryptContent(password);
  user.password = hashedPassword;
  adminDb.chain.get("users").find({ id }).assign(user).value();
  await adminDb.write();
};

export const updateUser = async (id: string, username: string, role: RoleType) => {
  await adminDb.read();
  const users = adminDb.chain.get("users").value() || [];
  const user = users.find((u) => u.id === id);
  if (!user) {
    throw new Error("用户不存在");
  }

  const adminUsers = users.filter((u) => u.role === "admin");
  if (
    user.role === "admin" && // 当前是管理员
    role !== "admin" && // 要降为非管理员
    adminUsers.length === 1 // 系统只剩一个管理员
  ) {
    throw new Error("系统至少需要保留一名管理员");
  }

  if (username !== user.username && users.some((u) => u.username === username)) {
    throw new Error("新用户名已存在");
  }

  user.username = username;
  user.role = role;

  adminDb.chain.get("users").find({ id }).assign(user).value();
  await adminDb.write();
};
