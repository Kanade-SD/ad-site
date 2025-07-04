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
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
}
</style>
