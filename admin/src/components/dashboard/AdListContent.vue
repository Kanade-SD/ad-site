<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-base font-bold flex items-center justify-between">
      横幅图片广告
      <el-button type="primary" @click="addAd">添加</el-button>
    </h2>
    <el-table :data="props.siteData.adList" stripe border>
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

  <DialogAd ref="dialogAdRef" @on-success="emit('onSuccess')" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import DialogAd from "@/components/dialog/DialogAd.vue";
import type { WebsiteData } from "@/types/data";
import { ElMessage } from "element-plus";
import { apiDeleteAd } from "@/api/api";

const props = defineProps<{
  siteData: WebsiteData;
}>();

const emit = defineEmits<{
  (e: "onSuccess"): void;
}>();

const dialogAdRef = ref<InstanceType<typeof DialogAd>>();

const addAd = () => {
  if (dialogAdRef.value) {
    dialogAdRef.value.open();
  }
};

const deleteAd = async (id: string) => {
  try {
    await apiDeleteAd(id);
    ElMessage.success("删除成功");
    emit("onSuccess");
  } catch (error: any) {
    ElMessage.error(error.msg ?? JSON.stringify(error));
  }
};
</script>

<style scoped></style>
