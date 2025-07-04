<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-base font-bold flex items-center justify-between">
      悬浮广告
      <el-button type="primary" @click="onAdd">添加</el-button>
    </h2>
    <el-table :data="props.siteData.adFloat" stripe border>
      <el-table-column label="图片" prop="imgUrl" max-width="1000">
        <template #default="scope">
          <el-image :src="scope.row.imgUrl" style="height: 60px; width: auto"></el-image>
        </template>
      </el-table-column>

      <el-table-column label="链接地址" prop="link"></el-table-column>
      <el-table-column label="显示位置" prop="position">
        <template #default="scope">
          <el-tag v-if="scope.row.position === 'left'" type="primary">左</el-tag>
          <el-tag v-else type="success">右</el-tag>
        </template>
      </el-table-column>

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

  <DialogAdFloat ref="dialogAdFloatRef" @on-success="emit('onSuccess')" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import DialogAdFloat from "@/components/dialog/DialogAdFloat.vue";
import type { WebsiteData } from "@/types/data";
import { ElMessage } from "element-plus";
import { apiDeleteAdFloat } from "@/api/api";

const props = defineProps<{
  siteData: WebsiteData;
}>();

const emit = defineEmits<{
  (e: "onSuccess"): void;
}>();

const dialogAdFloatRef = ref<InstanceType<typeof DialogAdFloat>>();

const onAdd = () => {
  if (dialogAdFloatRef.value) {
    dialogAdFloatRef.value.open();
  }
};

const onDelete = async (id: string) => {
  try {
    await apiDeleteAdFloat(id);
    ElMessage.success("删除成功");
    emit("onSuccess");
  } catch (error: any) {
    ElMessage.error(error.msg ?? JSON.stringify(error));
  }
};
</script>

<style scoped></style>
