<template>
  <div class="header h-full flex justify-between items-center">
    <div class="logo flex items-center gap-4 text-xl font-bold">
      {{ siteTitle }}
    </div>
    <div>
      <el-dropdown trigger="click">
        <div class="user-info flex items-center gap-2 cursor-pointer">
          <el-avatar :src="userStore.user?.avatar || defaultAvatar" />
          <span class="text-[var(--el-bg-color)]">{{ userStore.user?.username }}</span>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="dialogPasswordRef?.open(userStore.user?.id as string)">
              修改密码
            </el-dropdown-item>
            <el-dropdown-item @click="signOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <DialogPassword ref="dialogPasswordRef" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import DialogPassword from "@/components/dialog/DialogPassword.vue";
import { useUserStore } from "@/stores/user";
import defaultAvatar from "@/assets/images/avatar.png";

const siteTitle = import.meta.env.VITE_SITE_TITLE;
const userStore = useUserStore();

const dialogPasswordRef = ref<InstanceType<typeof DialogPassword>>();

const signOut = () => userStore.signOut();
</script>

<style scoped></style>
