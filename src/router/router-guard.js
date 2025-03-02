import LocalCache from "@/utils/cache";

export function routerGuard(router) {
  router.beforeEach((to, from, next) => {
    const isAuthenticated = checkAuthState();
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    // 开发环境模拟认证
    if (import.meta.env.VITE_APP_MOCK_AUTH) {
      return handleMockAuth(to, next);
    }

    if (requiresAuth && !isAuthenticated) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }

    // 检查认证状态
    function checkAuthState() {
      return !!LocalCache.getCache("token");
    }
  });
}

/**
 * 模拟token校验
 */
function handleMockAuth(to, next) {
  if (to.meta.requiresAuth) {
    const mockToken = localStorage.getItem("mock_token");
    mockToken ? next() : next("/login");
  } else {
    next();
  }
}
