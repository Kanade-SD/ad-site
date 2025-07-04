import { websiteDb } from "../../db";

export const getSiteData = async () => {
  await websiteDb.read();
  return websiteDb.data || {};
};
