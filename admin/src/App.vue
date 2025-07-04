<template>
  <RouterView />
</template>

<script setup lang="ts">
import useEventBus from "@/composables/useEventBus";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/user";

const router = useRouter();
const userStore = useUserStore();

useEventBus.on("UN-AUTH", () => {
  userStore.signOut();
  router.replace({ name: "login" });
});
useEventBus.on("UN-LOGIN", () => {
  userStore.signOut();
  router.replace({ name: "login" });
});
</script>
