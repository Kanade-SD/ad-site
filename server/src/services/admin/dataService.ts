import { websiteDb } from "../../db";
import { deleteFileByName } from "../../middleware/fileMiddleware";
import type {
  AdAppType,
  AdCardType,
  AdFloatType,
  AdTableType,
  AdType,
  LinkType,
  WebsiteData,
} from "../../types/dbType";
import { v4 as uuidv4 } from "uuid";

export const getAllData = async () => {
  await websiteDb.read();
  return websiteDb.data || {};
};

export const updateData = async (data: WebsiteData) => {
  await websiteDb.read();
  websiteDb.data = {
    ...websiteDb.data,
    ...data,
  };
  await websiteDb.write();
};

export const addLink = async (link: LinkType) => {
  link.id = uuidv4();
  await websiteDb.read();
  websiteDb.chain.get("links").push(link).value();
  await websiteDb.write();
};

export const updateLink = async (link: LinkType) => {
  await websiteDb.read();
  websiteDb.chain.get("links").find({ id: link.id }).assign(link).value();
  await websiteDb.write();
};

export const deleteLink = async (id: string) => {
  await websiteDb.read();
  websiteDb.chain
    .get("links")
    .remove((link) => link.id === id)
    .value();
  await websiteDb.write();
};

export const addAd = async (ad: AdType) => {
  ad.id = uuidv4();
  await websiteDb.read();
  websiteDb.chain.get("adList").push(ad).value();
  await websiteDb.write();
};

export const deleteAd = async (id: string) => {
  await websiteDb.read();
  const imgUrl = websiteDb.chain.get("adList").find({ id }).get("imgUrl").value();
  const filename = imgUrl.split("/").pop();

  deleteFileByName(filename);

  websiteDb.chain
    .get("adList")
    .remove((ad) => ad.id === id)
    .value();
  await websiteDb.write();
};

export const addTableLink = async (adTable: AdTableType) => {
  adTable.id = uuidv4();
  await websiteDb.read();
  websiteDb.chain.get("adTable").push(adTable).value();
  await websiteDb.write();
};

export const updateTableLink = async (adTable: AdTableType) => {
  await websiteDb.read();
  websiteDb.chain.get("adTable").find({ id: adTable.id }).assign(adTable).value();
  await websiteDb.write();
};

export const deleteTableLink = async (id: string) => {
  await websiteDb.read();
  websiteDb.chain
    .get("adTable")
    .remove((link) => link.id === id)
    .value();
  await websiteDb.write();
};

export const addAdApp = async (adApp: AdAppType) => {
  adApp.id = uuidv4();
  await websiteDb.read();
  websiteDb.chain.get("adApp").push(adApp).value();
  await websiteDb.write();
};

export const deleteAdApp = async (id: string) => {
  await websiteDb.read();
  const imgUrl = websiteDb.chain.get("adApp").find({ id }).get("imgUrl").value();
  const filename = imgUrl.split("/").pop();

  deleteFileByName(filename);

  websiteDb.chain
    .get("adApp")
    .remove((ad) => ad.id === id)
    .value();
  await websiteDb.write();
};

export const addAdCard = async (ad: AdCardType) => {
  ad.id = uuidv4();
  await websiteDb.read();
  websiteDb.chain.get("adCard").push(ad).value();
  await websiteDb.write();
};

export const deleteAdCard = async (id: string) => {
  await websiteDb.read();
  const imgUrl = websiteDb.chain.get("adCard").find({ id }).get("imgUrl").value();
  const filename = imgUrl.split("/").pop();

  deleteFileByName(filename);

  websiteDb.chain
    .get("adCard")
    .remove((ad) => ad.id === id)
    .value();
  await websiteDb.write();
};

export const addAdFloat = async (ad: AdFloatType) => {
  ad.id = uuidv4();
  await websiteDb.read();
  websiteDb.chain.get("adFloat").push(ad).value();
  await websiteDb.write();
};

export const deleteAdFloat = async (id: string) => {
  await websiteDb.read();
  const imgUrl = websiteDb.chain.get("adFloat").find({ id }).get("imgUrl").value();
  const filename = imgUrl.split("/").pop();

  deleteFileByName(filename);

  websiteDb.chain
    .get("adFloat")
    .remove((ad) => ad.id === id)
    .value();
  await websiteDb.write();
};
