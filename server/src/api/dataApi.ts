import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { fail, success } from "../utils/response";
import {
  addAd,
  addAdApp,
  addAdCard,
  addAdFloat,
  addLink,
  addTableLink,
  deleteAd,
  deleteAdApp,
  deleteAdCard,
  deleteAdFloat,
  deleteLink,
  deleteTableLink,
  getAllData,
  updateData,
  updateLink,
  updateTableLink,
} from "../services/admin/dataService";

const router = Router();

router.get("/getAll", authMiddleware, async (req, res) => {
  try {
    const data = await getAllData();
    res.json(success(data));
  } catch (e: any) {
    res.json(fail(e.message));
  }
});

router.post("/update", authMiddleware, async (req, res) => {
  const data = req.body;
  try {
    await updateData(data);
    res.json(success(null, "数据更新成功"));
  } catch (e: any) {
    res.json(fail(e.message));
  }
});

router.post("/addLink", authMiddleware, async (req, res) => {
  const link = req.body;
  try {
    await addLink(link);
    res.json(success(null, "链接添加成功"));
  } catch (e: any) {
    res.json(fail(e.message));
  }
});

router.post("/updateLink", authMiddleware, async (req, res) => {
  const link = req.body;
  try {
    await updateLink(link);
    res.json(success(null, "链接更新成功"));
  } catch (e: any) {
    res.json(fail(e.message));
  }
});

router.post("/deleteLink", authMiddleware, async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.json(fail("id不能为空"));
    return;
  }
  try {
    await deleteLink(id);
    res.json(success(null, "链接删除成功"));
  } catch (e: any) {
    res.json(fail(e.message));
  }
});

router.post("/addAd", authMiddleware, async (req, res) => {
  const data = req.body;
  try {
    await addAd(data);
    res.json(success(null, "添加成功"));
  } catch (e: any) {
    res.json(fail(e.message));
  }
});

router.post("/deleteAd", authMiddleware, async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.json(fail("参数错误"));
    return;
  }
  try {
    await deleteAd(id);
    res.json(success(null, "删除成功"));
  } catch (e: any) {
    res.json(fail(e.message));
  }
});

router.post("/addTableLink", authMiddleware, async (req, res) => {
  const link = req.body;
  try {
    await addTableLink(link);
    res.json(success(null, "链接添加成功"));
  } catch (e: any) {
    res.json(fail(e.message));
  }
});

router.post("/updateTableLink", authMiddleware, async (req, res) => {
  const link = req.body;
  try {
    await updateTableLink(link);
    res.json(success(null, "链接更新成功"));
  } catch (e: any) {
    res.json(fail(e.message));
  }
});

router.post("/deleteTableLink", authMiddleware, async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.json(fail("id不能为空"));
    return;
  }
  try {
    await deleteTableLink(id);
    res.json(success(null, "链接删除成功"));
  } catch (e: any) {
    res.json(fail(e.message));
  }
});

router.post("/addAdApp", authMiddleware, async (req, res) => {
  const data = req.body;
  try {
    await addAdApp(data);
    res.json(success(null, "添加成功"));
  } catch (e: any) {
    res.json(fail(e.message));
  }
});

router.post("/deleteAdApp", authMiddleware, async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.json(fail("参数错误"));
    return;
  }
  try {
    await deleteAdApp(id);
    res.json(success(null, "删除成功"));
  } catch (e: any) {
    res.json(fail(e.message));
  }
});

router.post("/addAdCard", authMiddleware, async (req, res) => {
  const data = req.body;
  try {
    await addAdCard(data);
    res.json(success(null, "添加成功"));
  } catch (e: any) {
    res.json(fail(e.message));
  }
});

router.post("/deleteAdCard", authMiddleware, async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.json(fail("参数错误"));
    return;
  }
  try {
    await deleteAdCard(id);
    res.json(success(null, "删除成功"));
  } catch (e: any) {
    res.json(fail(e.message));
  }
});

router.post("/addAdFloat", authMiddleware, async (req, res) => {
  const data = req.body;
  try {
    await addAdFloat(data);
    res.json(success(null, "添加成功"));
  } catch (e: any) {
    res.json(fail(e.message));
  }
});

router.post("/deleteAdFloat", authMiddleware, async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.json(fail("参数错误"));
    return;
  }
  try {
    await deleteAdFloat(id);
    res.json(success(null, "删除成功"));
  } catch (e: any) {
    res.json(fail(e.message));
  }
});

export default router;
