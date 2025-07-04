<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-base font-bold flex items-center justify-between">
      卡片图片广告
      <el-button type="primary" @click="addAd">添加</el-button>
    </h2>
    <el-table :data="props.siteData.adCard" stripe border>
      <el-table-column label="图片" prop="imgUrl" max-width="1000">
        <template #default="scope">
          <el-image :src="scope.row.imgUrl" style="height: 60px; width: auto"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="链接地址" prop="link"></el-table-column>

      <el-table-column label="操作" width="160">
        <template #default="scope">
          <el-popconfirm title="确定要删除吗？" @confirm="deleteAd(scope.row.id)">
            <template #reference>
              <el-button type="danger" @click="scope.row" link>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <DialogAdCard ref="dialogAdCardRef" @on-success="emit('onSuccess')" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { WebsiteData } from "@/types/data";
import { ElMessage } from "element-plus";
import { apiDeleteAdCard } from "@/api/api";
import DialogAdCard from "../dialog/DialogAdCard.vue";

const props = defineProps<{
  siteData: WebsiteData;
}>();

const emit = defineEmits<{
  (e: "onSuccess"): void;
}>();

const dialogAdCardRef = ref<InstanceType<typeof DialogAdCard>>();

const addAd = () => {
  if (dialogAdCardRef.value) {
    dialogAdCardRef.value.open();
  }
};

const deleteAd = async (id: string) => {
  try {
    await apiDeleteAdCard(id);
    ElMessage.success("删除成功");
    emit("onSuccess");
  } catch (error: any) {
    ElMessage.error(error.msg ?? JSON.stringify(error));
  }
};
</script>

<style scoped></style>
