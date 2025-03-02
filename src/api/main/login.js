import { request } from "../index";

export function loginRequest(account) {
  console.log("account:", account);

  return request.request({
    url: "",
    method: "get",
    params: account, //data是放在account中的
    // 给当前请求单独设置拦截：
    interceptors: {
      requestInterceptor: (config) => {
        return config;
      },
      responseInterceptor: (res) => {
        return res;
      }
    },
    showLoading: true // 如果这里不传，就会使用封装时设置的默认值false
  });
}
