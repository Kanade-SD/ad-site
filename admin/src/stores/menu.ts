import { ref, watch } from "vue";
import { defineStore } from "pinia";
import router from "@/router";
import type { MenuItem } from "@/types/menu";

export const useMenuStore = defineStore("menu", () => {
  const menu = ref<MenuItem[]>([
    {
      name: "dashboard",
      title: "网站管理",
      path: "dashboard",
      icon: "Odometer",
      // component: "Dashboard",
    },
    {
      name: "users",
      title: "用户管理",
      path: "users",
      icon: "User",
      // component: "UsersView",
    },
  ]);

  const setMenu = (data: MenuItem[]) => {
    menu.value = data;
  };

  // watch(
  //   () => menu,
  //   (newValue) => {
  //     if (newValue.value.length > 0) {
  //       const indexRouteName = "home";
  //       const indexRoute = router.getRoutes().find((route) => route.name === indexRouteName);
  //       if (indexRoute) {
  //         newValue.value.forEach((item) => {
  //           const childRoute = {
  //             path: item.path,
  //             name: item.name,
  //             component: () => import(`@/views/${item.component}.vue`),
  //             meta: {
  //               title: item.title,
  //               auth: item.auth,
  //               roles: item.roles,
  //             },
  //           };
  //           // 检查是否已存在相同的子路由，避免重复添加
  //           if (!indexRoute.children.some((child) => child.name === item.name)) {
  //             indexRoute.children.push(childRoute);
  //             router.addRoute(indexRouteName, childRoute); // 动态添加到 index 的 children 中
  //           }
  //         });
  //       }
  //     }
  //   },
  //   { immediate: true },
  // );

  return {
    menu,
    setMenu,
  };
});
