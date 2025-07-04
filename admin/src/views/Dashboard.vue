<template>
  <DefaultLayout>
    <template #header>
      <Header />
    </template>

    <template #aside>
      <Aside />
    </template>

    <AdContent />
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layout/DefaultLayout.vue";
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";
import AdContent from "@/components/dashboard/AdContent.vue";
</script>

<style scoped></style>
