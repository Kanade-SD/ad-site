<template>
  <div class="login-container min-h-screen relative p-4">
    <h1 class="text-2xl font-bold text-[var(--el-color-white)] text-shadow-lg">{{ siteTitle }}</h1>
    <LoginCard />
  </div>
</template>

<script setup lang="ts">
import LoginCard from "@/components/login/LoginCard.vue";

const siteTitle = import.meta.env.VITE_SITE_TITLE;
</script>

<style scoped lang="scss">
.login-container {
  background-image: url("@/assets/images/login_bg.jpg");
  background-size: cover;
  background-position: center;
}
</style>
