import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";
import type { Role } from "@/types/user";
import { ElMessage } from "element-plus";

const router = createRouter({
  history: createWebHistory(
    import.meta.env.MODE === "production" ? "/admin/" : import.meta.env.BASE_URL,
  ),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/views/Dashboard.vue"),
      meta: {
        title: "首页",
        auth: true,
      },
    },
    {
      path: "/users",
      name: "users",
      component: () => import("@/views/UsersView.vue"),
      meta: {
        title: "用户管理",
        auth: true,
        roles: ["admin"],
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      meta: {
        title: "登录",
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  const siteTitle = import.meta.env.VITE_SITE_TITLE as string;
  const { auth, roles } = to.meta; // 是否需要认证

  const pageTitle = to.meta.title as string;
  if (pageTitle) {
    document.title = `${pageTitle} - ${siteTitle}`;
  } else {
    document.title = siteTitle;
  }

  // 不需要认证，直接放行
  if (!auth) return next();

  // 需要认证，但没有 token，跳转登录
  if (!userStore.token) return next({ name: "login" });

  // 有 token 但没有用户信息，先获取
  if (!userStore.user) {
    try {
      await userStore.getUserInfo();
    } catch (e) {
      return next({ name: "login" });
    }
  }

  // 有角色要求但当前用户不满足
  if (roles && !roles.includes(userStore.user?.role as Role)) {
    ElMessage.error("无权限访问");
    return next({ name: "dashboard" });
  }

  // 通过
  next();
});

export default router;
