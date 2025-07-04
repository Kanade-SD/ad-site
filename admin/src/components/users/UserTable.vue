<template>
  <el-card>
    <template #header>
      <div class="flex justify-between items-center">
        <div>后台用户管理</div>
        <el-button type="primary" @click="addUser">添加用户</el-button>
      </div>
    </template>

    <el-table :data="data">
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="角色" prop="role">
        <template #default="scope">
          <el-tag v-if="scope.row.role === 'admin'" type="success">管理员</el-tag>
          <el-tag v-else-if="scope.row.role === 'editor'" type="primary">编辑</el-tag>
          <el-tag v-else type="info">用户</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" size="small" link @click="editUser(scope.row)">编辑</el-button>
          <el-button
            type="primary"
            size="small"
            link
            @click="dialogPasswordRef?.open(scope.row.id)"
          >
            修改密码
          </el-button>
          <el-popconfirm title="确定要删除吗？" @confirm="onDelete(scope.row.id)">
            <template #reference>
              <el-button type="danger" size="small" link> 删除 </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <DialogPassword ref="dialogPasswordRef" />
  <DialogUser ref="dialogUserRef" @on-success="getAllUsers" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import DialogPassword from "@/components/dialog/DialogPassword.vue";
import DialogUser from "@/components/dialog/DialogUser.vue";
import { apiDeleteUser, apiGetAllUsers } from "@/api/api";
import { type User } from "@/types/user";
import { ElMessage } from "element-plus";

const data = ref<User[]>([]);

const getAllUsers = async () => {
  try {
    const res = await apiGetAllUsers();
    data.value = [...res];
  } catch (error: any) {
    console.log(error);
    ElMessage.error(error.msg ?? JSON.stringify(error));
  }
};

const dialogUserRef = ref<InstanceType<typeof DialogUser>>();
const addUser = () => {
  dialogUserRef.value?.open();
};
const editUser = (user: User) => {
  dialogUserRef.value?.open(user, true);
};

const dialogPasswordRef = ref<InstanceType<typeof DialogPassword>>();

const onDelete = async (id: string) => {
  try {
    await apiDeleteUser(id);
    ElMessage.success("删除成功");
    getAllUsers();
  } catch (error: any) {
    console.log(error);
    ElMessage.error(error.msg ?? JSON.stringify(error));
  }
};

onMounted(() => {
  getAllUsers();
});
</script>

<style scoped></style>
