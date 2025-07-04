import { ref, nextTick } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/types/user";
import router from "@/router"; // 导入 router 实例
import { apiGetUserInfo, apiLogin } from "@/api/api";
import { ElMessage } from "element-plus";

export const useUserStore = defineStore("user", () => {
  const user = ref<User>();
  const token = ref<string | null>(localStorage.getItem("token"));

  const setUser = (data: User) => {
    user.value = data;
  };

  const getUserInfo = async () => {
    if (token.value) {
      try {
        const res = await apiGetUserInfo();
        setUser(res);
      } catch (error: any) {
        console.log(error);
        ElMessage.error(error.message || JSON.stringify(error));
        signOut();
      }
    }
  };

  const signIn = async (username: string, password: string, remember: boolean) => {
    try {
      const res = await apiLogin(username, password);
      setToken(res.token, remember);
      setUser(res.user);
      ElMessage.success("登录成功");
      nextTick(() => {
        router.replace({ name: "dashboard" });
      });
    } catch (error: any) {
      console.log(error);
      ElMessage.error(error.msg || error.toString());
    }
  };

  const signOut = () => {
    user.value = undefined;
    token.value = null;
    localStorage.removeItem("token");
    router.replace({ name: "login" });
  };

  const setToken = (_token: string, remember: boolean) => {
    if (remember) localStorage.setItem("token", _token);
    token.value = _token;
  };

  return {
    user,
    token,
    getUserInfo,
    setUser,
    signIn,
    signOut,
    setToken,
  };
});
