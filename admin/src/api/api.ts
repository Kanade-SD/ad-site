import { useApi } from "@/composables/useApi";
import type {
  AdAppType,
  AdCardType,
  AdFloatType,
  AdType,
  LinkType,
  WebsiteData,
} from "@/types/data";
import type { Role, User } from "@/types/user";

const { get, post, put, del } = useApi();

export const apiImgUpload = (formData: FormData) =>
  post("/api/admin/file/imgUpload", formData, {
    interceptors: ["auth"],
    headers: { "Content-Type": "multipart/form-data" },
  });

export const apiLogin = (username: string, password: string) =>
  post("/api/admin/user/login", { username, password });

export const apiGetUserInfo = () => get("/api/admin/user/getUserInfo", { interceptors: ["auth"] });

export const apiUpdatePassword = (id: string, password: string) =>
  post("/api/admin/user/updatePassword", { id, password }, { interceptors: ["auth"] });

export const apiGetAllUsers = () => get("/api/admin/user/getAll", { interceptors: ["auth"] });

export const apiAddUser = (user: User) =>
  post("/api/admin/user/add", user, { interceptors: ["auth"] });

export const apiDeleteUser = (id: string) =>
  post("/api/admin/user/delete", { id }, { interceptors: ["auth"] });

export const apiUpdateUser = (user: User) =>
  post("/api/admin/user/update", user, { interceptors: ["auth"] });

export const apiGetAllData = () =>
  get("/api/admin/data/getAll", {
    interceptors: ["auth"],
  });

export const apiUpdateData = (data: WebsiteData) =>
  post("/api/admin/data/update", data, {
    interceptors: ["auth"],
  });

export const apiAddLink = (ad: LinkType) =>
  post("/api/admin/data/addLink", ad, {
    interceptors: ["auth"],
  });

export const apiUpdateLink = (ad: LinkType) =>
  post("/api/admin/data/updateLink", ad, {
    interceptors: ["auth"],
  });

export const apiDeleteLink = (id: string) =>
  post(
    "/api/admin/data/deleteLink",
    { id },
    {
      interceptors: ["auth"],
    },
  );

export const apiAddAd = (ad: AdType) =>
  post("/api/admin/data/addAd", ad, {
    interceptors: ["auth"],
  });

export const apiDeleteAd = (id: string) =>
  post("/api/admin/data/deleteAd", { id }, { interceptors: ["auth"] });

export const apiAddTableLink = (ad: LinkType) =>
  post("/api/admin/data/addTableLink", ad, {
    interceptors: ["auth"],
  });

export const apiUpdateTableLink = (ad: LinkType) =>
  post("/api/admin/data/updateTableLink", ad, {
    interceptors: ["auth"],
  });

export const apiDeleteTableLink = (id: string) =>
  post(
    "/api/admin/data/deleteTableLink",
    { id },
    {
      interceptors: ["auth"],
    },
  );

export const apiAddAdApp = (ad: AdAppType) =>
  post("/api/admin/data/addAdApp", ad, {
    interceptors: ["auth"],
  });

export const apiDeleteAdApp = (id: string) =>
  post("/api/admin/data/deleteAdApp", { id }, { interceptors: ["auth"] });

export const apiAddAdCard = (ad: AdCardType) =>
  post("/api/admin/data/addAdCard", ad, {
    interceptors: ["auth"],
  });

export const apiDeleteAdCard = (id: string) =>
  post("/api/admin/data/deleteAdCard", { id }, { interceptors: ["auth"] });

export const apiAddAdFloat = (ad: AdFloatType) =>
  post("/api/admin/data/addAdFloat", ad, {
    interceptors: ["auth"],
  });

export const apiDeleteAdFloat = (id: string) =>
  post("/api/admin/data/deleteAdFloat", { id }, { interceptors: ["auth"] });
