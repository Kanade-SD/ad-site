<template>
  <DefaultLayout>
    <template #header>
      <Header />
    </template>

    <template #aside>
      <Aside />
    </template>

    <UserTable />
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layout/DefaultLayout.vue";
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";
import UserTable from "@/components/users/UserTable.vue";
</script>

<style scoped></style>
