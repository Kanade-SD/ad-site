import { Router } from "express";
import { upload, uploadDir } from "../middleware/fileMiddleware";
import { fail, success } from "../utils/response";

const router = Router();

router.post("/imgUpload", upload.single("file"), (req, res) => {
  console.log(req.file);
  if (!req.file) {
    res.json(fail("未上传文件"));
    return;
  }
  // 构造图片访问链接
  const imgUrl = `${process.env.APP_IMG_DIR}/${req.file.filename}`;
  res.json(success({ imgUrl }, "上传成功"));
});

export default router;
