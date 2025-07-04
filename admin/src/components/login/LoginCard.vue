<template>
  <div
    class="absolute min-w-[22rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg shadow-lg bg-[var(--el-bg-color)]/80 backdrop-blur-sm"
  >
    <div class="mb-4">
      <h1 class="text-2xl font-bold mb-2">欢迎登陆</h1>
      <p class="text-sm text-[var(--el-text-color-regular)]">{{ siteTitle }}</p>
    </div>

    <div>
      <el-form size="large" ref="formRef" :model="form" :rules="rules">
        <el-form-item label-width="0" prop="username">
          <el-input
            placeholder="请输入用户名"
            maxlength="64"
            v-model="form.username"
            :prefix-icon="User"
          />
        </el-form-item>

        <el-form-item label-width="0" prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            maxlength="64"
            show-password
            v-model="form.password"
            :prefix-icon="Lock"
          />
        </el-form-item>

        <div class="flex justify-between mt-4">
          <el-form-item label-width="0">
            <el-checkbox v-model="form.remember" label="记住账号" size="large" />
          </el-form-item>
          <el-form-item label-width="0">
            <el-link type="primary" :underline="false" href="/forget">忘记密码</el-link>
          </el-form-item>
        </div>

        <el-button
          type="primary"
          size="large"
          class="w-full"
          @click="submitForm"
          :loading="loading"
        >
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { type FormInstance } from "element-plus";
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const siteTitle = import.meta.env.VITE_SITE_TITLE;
const userStore = useUserStore();

const loading = ref(false);

const formRef = ref<FormInstance>();
const form = ref({
  username: "",
  password: "",
  remember: true,
});
const rules = ref({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 4, max: 64, message: "长度在 4 到 64 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 64, message: "长度在 6 到 64 个字符", trigger: "blur" },
  ],
});
const submitForm = async () => {
  if (!formRef.value) return;
  try {
    const valid = await formRef.value.validate();
    if (!valid) return;
  } catch (error: any) {
    return;
  }
  loading.value = true;
  await userStore.signIn(form.value.username, form.value.password, form.value.remember);
  loading.value = false;
};
</script>

<style scoped></style>
