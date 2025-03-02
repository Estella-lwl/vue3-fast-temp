import axios from "axios";
import { ElLoading, ElMessage } from "element-plus";

const message = ElMessage;
const defaultLoading = false;

export class Service {
  instance;
  interceptors;
  showLoading;
  loading;

  constructor(config) {
    this.instance = axios.create(config);
    this.showLoading = config.showLoading ?? defaultLoading;
    this.interceptors = config.interceptors;
    // 实例拦截：
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 全局拦截
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading && this.showLoading === true) {
          this.loading = ElLoading.service({
            lock: true,
            text: "Loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
        }
        return config;
      },
      (err) => {
        return err;
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data;
        this.loading?.close();
        if (data?.code === 1) {
          message.error(data.message);
        } else {
          // message.success(data.message);
          return data;
        }
      },
      (err) => {
        this.loading = close();
        return err;
      }
    );
  }

  // 单个请求的拦截
  request(config) {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      if (config.showLoading) {
        this.showLoading = config.showLoading;
      }
      this.instance
        .request(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res); // 转换res
          }
          this.showLoading = defaultLoading;
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = defaultLoading;
          reject(err);
          return err;
        });
    });
  }
}
