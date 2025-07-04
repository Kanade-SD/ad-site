import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { AdminData, WebsiteData } from "../types/dbType";
import lodash from "lodash";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs";

class LowWithLodash<T> extends Low<T> {
  chain: lodash.ExpChain<this["data"]> = lodash.chain(this).get("data");
}

// 数据库实例引用
let adminDb: LowWithLodash<AdminData>;
let websiteDb: LowWithLodash<WebsiteData>;

const defaultWebsiteData = (): WebsiteData => ({
  siteName: "",
  marquee: {
    text: "",
    link: "",
    textColor: "",
    bgColor: "",
  },
  links: [],
  adList: [],
  adTable: [],
  adApp: [],
  adCard: [],
  adFloat: [],
});

const defaultAdminData = async (): Promise<AdminData> => {
  const username = process.env.APP_DEFAULT_USERNAME;
  const password = await bcrypt.hash(process.env.APP_DEFAULT_PASSWORD, 10);
  return {
    users: [
      {
        id: uuidv4(),
        username,
        password,
        role: "admin",
      },
    ],
  };
};

const initializeDatabases = async () => {
  try {
    console.log("初始化数据库...");
    // 网站数据库
    const websitePath = path.join("data", "website.json");
    const websiteExists = fs.existsSync(websitePath);
    websiteDb = new LowWithLodash(new JSONFile<WebsiteData>(websitePath), defaultWebsiteData());
    await websiteDb.read();
    if (!websiteExists || !websiteDb.data) {
      websiteDb.data = defaultWebsiteData();
      await websiteDb.write();
    }

    // 后台数据库
    const adminPath = path.join("data", "admin.json");
    const adminExists = fs.existsSync(adminPath);
    adminDb = new LowWithLodash(new JSONFile<AdminData>(adminPath), await defaultAdminData());
    await adminDb.read();
    if (!adminExists || !adminDb.data) {
      adminDb.data = await defaultAdminData();
      await adminDb.write();
    }

    console.log("数据库初始化完成！");
  } catch (error) {
    console.error("初始化数据库时出错:", error);
  }
};

export { initializeDatabases, websiteDb, adminDb };
