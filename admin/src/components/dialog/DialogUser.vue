<template>
  <el-dialog v-model="visible" title="用户设置" align-center @close="close">
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="8rem">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item v-if="!isEdit" label="密码" prop="password">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item label="用户权限" prop="role">
        <el-radio-group v-model="formData.role">
          <el-radio v-for="role in roles" :key="role" :value="role">{{ role }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close" :loading="loading">取消</el-button>
        <el-button type="primary" @click="onSave" :loading="loading"> 保存 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { apiAddUser, apiUpdateUser } from "@/api/api";
import type { Role, User } from "@/types/user";
import { ElMessage, type FormInstance } from "element-plus";
import { ref } from "vue";
import { roles } from "@/types/user";

const visible = defineModel<boolean>("visible");

const emit = defineEmits<{
  (e: "onSuccess"): void;
}>();

const loading = ref(false);
const isEdit = ref(false);

const defaultData = (): User => ({
  id: "",
  username: "",
  password: "",
  role: "" as Role,
});
const formData = ref<User>(defaultData());

const formRef = ref<FormInstance>();
const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 2, max: 32, message: "长度在 2 到 32 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 32, message: "密码长度在 6 到 32 个字符", trigger: "blur" },
  ],
  role: [{ required: true, message: "请选择用户权限", trigger: "change" }],
};

const onSave = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      if (!formData.value.id || formData.value.id === "") {
        add();
      } else {
        update();
      }
    }
  });
};

const add = async () => {
  try {
    loading.value = true;
    await apiAddUser(formData.value);
    ElMessage.success("保存成功");
    emit("onSuccess");
    close();
  } catch (error: any) {
    console.log(error);
    ElMessage.error(error.msg ?? JSON.stringify(error));
  } finally {
    loading.value = false;
  }
};

const update = async () => {
  try {
    loading.value = true;
    await apiUpdateUser(formData.value);
    ElMessage.success("保存成功");
    emit("onSuccess");
    close();
  } catch (error: any) {
    console.log(error);
    ElMessage.error(error.msg ?? JSON.stringify(error));
  } finally {
    loading.value = false;
  }
};

const open = (data?: User, _isEdit = false) => {
  visible.value = true;
  isEdit.value = _isEdit;
  if (data) formData.value = { ...data };
};

const close = () => {
  visible.value = false;
  formRef.value?.resetFields();
  formData.value = defaultData();
};

defineExpose({ open, close });
</script>

<style scoped></style>
