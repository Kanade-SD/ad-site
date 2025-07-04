<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-base font-bold flex items-center justify-between">
      APP图标广告
      <el-button type="primary" @click="onAdd">添加</el-button>
    </h2>
    <el-table :data="props.siteData.adApp" stripe border>
      <el-table-column label="图片" prop="imgUrl" max-width="1000">
        <template #default="scope">
          <el-image :src="scope.row.imgUrl" style="height: 60px; width: auto"></el-image>
        </template>
      </el-table-column>

      <el-table-column label="链接文字" prop="text"></el-table-column>
      <el-table-column label="链接地址" prop="link"></el-table-column>

      <el-table-column label="操作" width="160">
        <template #default="scope">
          <el-popconfirm title="确定要删除吗？" @confirm="onDelete(scope.row.id)">
            <template #reference>
              <el-button type="danger" @click="scope.row" link>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <DialogAdApp ref="dialogAdAppRef" @on-success="emit('onSuccess')" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import DialogAdApp from "@/components/dialog/DialogAdApp.vue";
import type { WebsiteData } from "@/types/data";
import { ElMessage } from "element-plus";
import { apiDeleteAdApp } from "@/api/api";

const props = defineProps<{
  siteData: WebsiteData;
}>();

const emit = defineEmits<{
  (e: "onSuccess"): void;
}>();

const dialogAdAppRef = ref<InstanceType<typeof DialogAdApp>>();

const onAdd = () => {
  if (dialogAdAppRef.value) {
    dialogAdAppRef.value.open();
  }
};

const onDelete = async (id: string) => {
  try {
    await apiDeleteAdApp(id);
    ElMessage.success("删除成功");
    emit("onSuccess");
  } catch (error: any) {
    ElMessage.error(error.msg ?? JSON.stringify(error));
  }
};
</script>

<style scoped></style>
