import { Service } from "../utils/request";
import { BASE_URL, TIME_OUT } from "./common/config";
import LocalCache from "@/utils/cache";

export const request = new Service({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 拦截所有请求 & 追加token
      const token = LocalCache.getCache("token");
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    requestInterceptorCatch: (err) => {
      return err;
    },
    responseInterceptor: (config) => {
      return config;
    },
    responseInterceptorCatch: (err) => {
      return err;
    }
  }
});
