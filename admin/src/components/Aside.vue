<template>
  <div class="flex flex-col h-full">
    <div class="flex-1">
      <el-menu router :default-active="route.name as string" class="h-full" :collapse="isCollapse">
        <el-menu-item v-for="(item, index) in menuStore.menu" :key="index" :index="item.name">
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from "@/stores/menu";
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";

const menuStore = useMenuStore();
const route = useRoute();

const isCollapse = ref(false);

onMounted(() => {
  window.addEventListener("resize", () => {
    if (window.innerWidth < 768) {
      isCollapse.value = true;
    } else {
      isCollapse.value = false;
    }
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", () => {});
});
</script>

<style scoped></style>
