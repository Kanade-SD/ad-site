import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import zhCn from "element-plus/es/locale/lang/zh-cn";

import ElementPlus from "element-plus"; // 引入element-plus组件
import "@/assets/elementStyle.scss"; // 引入element-plus自定义样式
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import "@/assets/main.css"; // 引入全局样式

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus, { locale: zhCn });
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");

if (import.meta.env.MODE === "development") {
  // 引入mock
  import("@/mock/mock");
}
