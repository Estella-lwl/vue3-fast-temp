import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import LocalCache from "@/utils/cache";
import router from "@/router";
import { loginRequest } from "@/api/main/login";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: LocalCache.getCache("token"),
    userInfo: LocalCache.getCache("userInfo"),
    password: "",
    userMenu: []
  }),

  getters: {
    getToken() {
      return this.token;
    },
    getUserInfo() {
      return this.userInfo;
    },
    getUserMenu() {
      return this.userMenu;
    }
  },

  actions: {
    setToken(token) {
      this.token = token;
    },

    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },

    setPwd(pwd) {
      this.password = pwd;
    },

    serUserMenu(userMenu) {
      this.userMenu = userMenu;
    },

    // 登录
    async accountLoginAction(payload) {
      console.log("current env:", import.meta.env.VITE_APP_MOCK_AUTH);
      if (import.meta.env.VITE_APP_MOCK_AUTH) {
        LocalCache.setCache("mock_token");
        router.push("/main/dashboard");
        return;
      }

      const loginData = await loginRequest(payload);
      if (loginData.code === 200) {
        ElMessage({
          message: "登陆成功",
          type: "success"
        });
      } else {
        ElMessage({
          message: loginData.msg,
          type: "error"
        });
      }

      const { token } = loginData.result;
      const userInfo = {
        userName: loginData.result.name
      };

      LocalCache.setCache("token", token, new Date().getTime());
      LocalCache.setCache("userInfo", userInfo);
      this.setToken(token);
      this.setUserInfo(userInfo);

      console.log("testing");

      router.push("/main");
    }
  }
});
