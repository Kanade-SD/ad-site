<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-base font-bold flex items-center justify-between">
      列表链接广告
      <el-button type="primary" @click="addLink">添加</el-button>
    </h2>
    <el-table :data="props.siteData.adTable" stripe border>
      <el-table-column label="链接文字" prop="text"></el-table-column>
      <el-table-column label="链接地址" prop="link"></el-table-column>
      <el-table-column label="文字颜色" prop="textColor">
        <template #default="scope">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-md" :style="{ backgroundColor: scope.row.textColor }"></div>
            <div>{{ scope.row.textColor }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="背景颜色" prop="bgColor">
        <template #default="scope">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-md" :style="{ backgroundColor: scope.row.bgColor }"></div>
            <div>{{ scope.row.bgColor }}</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="160">
        <template #default="scope">
          <el-button type="primary" link @click="updateLink(scope.row)"> 编辑 </el-button>
          <el-popconfirm title="确定要删除吗？" @confirm="deleteLink(scope.row.id)">
            <template #reference>
              <el-button type="danger" @click="scope.row" link>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <DialogTableLink ref="dialogTableLinkRef" @on-success="emit('onSuccess')" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import DialogTableLink from "@/components/dialog/DialogTableLink.vue";
import type { LinkType, WebsiteData } from "@/types/data";
import { apiDeleteTableLink } from "@/api/api";
import { ElMessage } from "element-plus";

const props = defineProps<{
  siteData: WebsiteData;
}>();

const emit = defineEmits<{
  (e: "onSuccess"): void;
}>();

const dialogTableLinkRef = ref<InstanceType<typeof DialogTableLink>>();
const addLink = () => {
  if (dialogTableLinkRef.value) {
    dialogTableLinkRef.value.open();
  }
};

const updateLink = (link: LinkType) => {
  if (dialogTableLinkRef.value) {
    dialogTableLinkRef.value.open(link);
  }
};

const deleteLink = async (id: string) => {
  try {
    await apiDeleteTableLink(id);
    ElMessage.success("删除成功");
    emit("onSuccess");
  } catch (error: any) {
    console.log(error);
    ElMessage.error(error.msg ?? JSON.stringify(error));
  }
};
</script>

<style scoped></style>
