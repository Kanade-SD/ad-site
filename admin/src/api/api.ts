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
  post("/api/file/imgUpload", formData, {
    interceptors: ["auth"],
    headers: { "Content-Type": "multipart/form-data" },
  });

export const apiLogin = (username: string, password: string) =>
  post("/api/user/login", { username, password });

export const apiGetUserInfo = () => get("/api/user/getUserInfo", { interceptors: ["auth"] });

export const apiUpdatePassword = (id: string, password: string) =>
  post("/api/user/updatePassword", { id, password }, { interceptors: ["auth"] });

export const apiGetAllUsers = () => get("/api/user/getAll", { interceptors: ["auth"] });

export const apiAddUser = (user: User) => post("/api/user/add", user, { interceptors: ["auth"] });

export const apiDeleteUser = (id: string) =>
  post("/api/user/delete", { id }, { interceptors: ["auth"] });

export const apiUpdateUser = (user: User) =>
  post("/api/user/update", user, { interceptors: ["auth"] });

export const apiGetAllData = () =>
  get("/api/data/getAll", {
    interceptors: ["auth"],
  });

export const apiUpdateData = (data: WebsiteData) =>
  post("/api/data/update", data, {
    interceptors: ["auth"],
  });

export const apiAddLink = (ad: LinkType) =>
  post("/api/data/addLink", ad, {
    interceptors: ["auth"],
  });

export const apiUpdateLink = (ad: LinkType) =>
  post("/api/data/updateLink", ad, {
    interceptors: ["auth"],
  });

export const apiDeleteLink = (id: string) =>
  post(
    "/api/data/deleteLink",
    { id },
    {
      interceptors: ["auth"],
    },
  );

export const apiAddAd = (ad: AdType) =>
  post("/api/data/addAd", ad, {
    interceptors: ["auth"],
  });

export const apiDeleteAd = (id: string) =>
  post("/api/data/deleteAd", { id }, { interceptors: ["auth"] });

export const apiAddTableLink = (ad: LinkType) =>
  post("/api/data/addTableLink", ad, {
    interceptors: ["auth"],
  });

export const apiUpdateTableLink = (ad: LinkType) =>
  post("/api/data/updateTableLink", ad, {
    interceptors: ["auth"],
  });

export const apiDeleteTableLink = (id: string) =>
  post(
    "/api/data/deleteTableLink",
    { id },
    {
      interceptors: ["auth"],
    },
  );

export const apiAddAdApp = (ad: AdAppType) =>
  post("/api/data/addAdApp", ad, {
    interceptors: ["auth"],
  });

export const apiDeleteAdApp = (id: string) =>
  post("/api/data/deleteAdApp", { id }, { interceptors: ["auth"] });

export const apiAddAdCard = (ad: AdCardType) =>
  post("/api/data/addAdCard", ad, {
    interceptors: ["auth"],
  });

export const apiDeleteAdCard = (id: string) =>
  post("/api/data/deleteAdCard", { id }, { interceptors: ["auth"] });

export const apiAddAdFloat = (ad: AdFloatType) =>
  post("/api/data/addAdFloat", ad, {
    interceptors: ["auth"],
  });

export const apiDeleteAdFloat = (id: string) =>
  post("/api/data/deleteAdFloat", { id }, { interceptors: ["auth"] });
