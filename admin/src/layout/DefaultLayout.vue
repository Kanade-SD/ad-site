<template>
  <el-container class="h-screen">
    <el-header class="bg-[var(--el-color-primary)] text-[var(--el-color-white)]">
      <slot name="header"></slot>
    </el-header>
    <el-container>
      <el-aside class="aside-box !w-fit md:!w-[240px]">
        <slot name="aside"></slot>
      </el-aside>
      <el-main class="bg-(--el-bg-color-page)">
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.aside-box {
  display: block;
  transition: all 0.3s ease-in-out;
}
</style>
