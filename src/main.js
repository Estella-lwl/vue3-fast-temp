import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElIcons from "@element-plus/icons-vue";
import { setupStore } from "@/stores";
import { globalRegister } from "@/global";

const app = createApp(App);

// 注册全局 element-icons 组件
for (const [key, component] of Object.entries(ElIcons)) {
  app.component(key, component);
}

// app.use(createPinia());
app.use(ElementPlus);
app.use(globalRegister);
setupStore(app); // 挂载状态管理
app.use(router);
app.mount("#app");
