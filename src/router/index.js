import { createRouter, createWebHistory } from "vue-router";
import { useRoute, createWebHashHistory } from "vue-router";
import { routerGuard } from "./router-guard";

// // 加载主框架路由
// const mainRoute = (await import("./modules/main.js")).default;
// // 自动加载业务子路由（匹配 modules/main-*.js 的约定）
// const childModules = import.meta.glob("./modules/main-*.js", { eager: true });
// mainRoute.children = Object.values(childModules)
//   .map((m) => m.default)
//   .flat();
// console.log("mainRoute: ", mainRoute);

// 加载所有路由模块
const moduleFiles = import.meta.glob("./modules/*.js", { eager: true });
const modules = Object.values(moduleFiles)
  .map((m) => m.default)
  .flat();
console.log("moduleFiles: ", moduleFiles);
console.log("modules: ", modules);

const routes = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/login.vue"),
    meta: { requiresAuth: false }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/views/common/404.vue")
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main.vue"),
    children: [
      {
        path: "/main/dashboard",
        component: () => import("@/views/dashboard.vue"),
        meta: {
          requiresAuth: true
        }
      },
      ...modules // 添加子路由模块
    ],
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
});

console.log("router: ", router.getRoutes());

routerGuard(router);

export default router;
