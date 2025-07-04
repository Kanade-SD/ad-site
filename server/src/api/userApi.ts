import { Router } from "express";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  updatePassword,
  updateUser,
} from "../services/admin/userService";
import { fail, success } from "../utils/response";
import { authMiddleware, getTokenData } from "../middleware/authMiddleware";
import { signToken } from "../utils/jwt";
import { ROLES } from "../types/roleType";

const router = Router();

// 登录
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.json(fail("用户名或密码不能为空"));
    return;
  }
  try {
    const user = await loginUser(username, password);
    const token = signToken({ id: user.id, username: user.username, role: user.role });
    res.json(success({ user, token }, "登录成功"));
  } catch (e: any) {
    res.json(fail(e.message, 401));
  }
});

// 获取所有用户
router.get("/getAll", authMiddleware, async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(success(users));
  } catch (e: any) {
    res.json(fail(e.message));
  }
});

// 获取用户信息
router.get("/getUserInfo", authMiddleware, async (req, res) => {
  try {
    const tokenData = getTokenData(req);
    if (!tokenData || !tokenData.id) {
      res.json(fail("token无效", 401));
      return;
    }
    const userInfo = await getUserInfo(tokenData.id);
    res.json(success(userInfo));
  } catch (e: any) {
    res.json(fail(e.message));
  }
});

// 添加用户
router.post("/add", async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) {
    res.json(fail("用户名和密码不能为空", 400));
    return;
  }
  if (!ROLES.includes(role)) {
    res.json(fail("用户权限设置错误", 400));
    return;
  }
  try {
    const id = await addUser(username, password, role);
    res.json(success({ id }, "用户添加成功"));
  } catch (e: any) {
    res.json(fail(e.message, 409));
  }
});

// 删除用户
router.post("/delete", authMiddleware, async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.json(fail("用户ID不能为空", 400));
  }
  try {
    await deleteUser(id);
    res.json(success(null, "用户删除成功"));
  } catch (e: any) {
    res.json(fail(e.message, 404));
  }
});

// 更新用户信息
router.post("/update", authMiddleware, async (req, res) => {
  const { id, username, role } = req.body;
  if (!id || !username || !role) {
    res.json(fail("缺少参数", 400));
  }
  try {
    await updateUser(id, username, role);
    res.json(success(null, "用户信息更新成功"));
  } catch (e: any) {
    res.json(fail(e.message, 404));
  }
});

// 修改登录密码
router.post("/updatePassword", authMiddleware, async (req, res) => {
  const { id, password } = req.body;
  if (!id) {
    res.json(fail("id不能为空", 400));
    return;
  }
  if (!password) {
    res.json(fail("密码不能为空", 400));
    return;
  }
  try {
    await updatePassword(id, password);
    res.json(success(null, "密码修改成功"));
  } catch (e: any) {
    res.json(fail(e.message, 404));
  }
});

export default router;
