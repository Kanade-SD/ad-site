import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";
import { useUserStore } from "@/stores/user";
import useEventBus from "./useEventBus";

declare module "axios" {
  // 扩展 InternalAxiosRequestConfig 接口，添加 interceptors 属性
  // 使用方法：在请求配置中添加 interceptors 属性，例如：["AUTH"]，表示使用 auth 拦截器
  export interface InternalAxiosRequestConfig {
    interceptors?: Array<string>;
  }
  // 扩展 AxiosRequestConfig 接口，添加 interceptors 属性
  export interface AxiosRequestConfig {
    interceptors?: Array<string>;
  }
}

// 定义请求拦截器内容列表
const interceptorList = {
  always: (config: InternalAxiosRequestConfig) => {
    // 常规拦截器逻辑
    return config;
  },
  auth: (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore();
    // 认证拦截器逻辑
    config.headers = config.headers || {};
    config.headers["authorization"] = `Bearer ${userStore.token}`;
    return config;
  },
};

// 创建 axios 实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 设置基础 URL
  timeout: 5000, // 设置超时时间
});

// 添加请求拦截器
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 执行常规拦截器逻辑
    config = interceptorList.always(config);
    // 执行特定拦截器逻辑
    if (config.interceptors) {
      // 过滤掉always
      const interceptors = new Set(
        Array.from(config.interceptors).filter((item) => item !== "always"),
      );
      for (const interceptor of interceptors) {
        if (interceptor in interceptorList) {
          config = interceptorList[interceptor as keyof typeof interceptorList](config);
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 添加响应拦截器
api.interceptors.response.use(
  (response) => {
    if (response.data.code !== 200) {
      return Promise.reject(response.data);
    }
    return response.data ?? response;
  },
  (error) => {
    // 响应错误处理逻辑
    console.log(error.response.data);
    // 如果是401错误，则跳转到登录页面
    if (error.response.status === 401) {
      useEventBus.emit("UN-AUTH");
    }
    return Promise.reject(error.response.data);
  },
);

export function useApi() {
  const request = (config: AxiosRequestConfig) => {
    return api
      .request(config)
      .then((response) => response.data) // 返回响应数据
      .catch((error) => {
        throw error;
      });
  };

  return {
    request,
    get(url: string, config: AxiosRequestConfig = {}) {
      return request({ ...config, method: "get", url });
    },
    post(url: string, data: any, config: AxiosRequestConfig = {}) {
      return request({ ...config, method: "post", url, data });
    },
    del(url: string, config: AxiosRequestConfig = {}) {
      return request({ ...config, method: "delete", url });
    },
    put(url: string, data: any, config: AxiosRequestConfig = {}) {
      return request({ ...config, method: "put", url, data });
    },
  };
}
