import { Router } from "express";
import { fail, success } from "../utils/response";
import { getSiteData } from "../services/public/siteService";

const router = Router();

router.get("/get", async (req, res) => {
  try {
    const data = await getSiteData();
    res.json(success(data));
  } catch (e: any) {
    res.json(fail(e.message));
  }
});

export default router;
