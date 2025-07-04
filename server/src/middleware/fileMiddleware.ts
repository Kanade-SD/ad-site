import multer from "multer";
import path from "path";
import fs from "fs";

// 确保上传目录存在
export const uploadDir = path.join(process.cwd(), process.env.APP_UPLOAD_DIR);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 配置 multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + "_" + Math.round(Math.random() * 1e9) + ext;
    cb(null, filename);
  },
});

export const deleteFileByName = (filename: string): boolean => {
  const filePath = path.join(uploadDir, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return true;
  }
  return false;
};

export const upload = multer({ storage });
