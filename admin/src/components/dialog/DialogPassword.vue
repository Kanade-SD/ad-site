<template>
  <el-dialog v-model="visible" title="修改登录密码" align-center @close="close" width="500px">
    <el-form :model="formData" :rules="rules" ref="formRef">
      <el-form-item label="新密码" prop="password">
        <el-input v-model="formData.password"></el-input>
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
import { apiUpdatePassword } from "@/api/api";
import { ElMessage, type FormInstance } from "element-plus";
import { ref } from "vue";

const visible = defineModel<boolean>("visible");

const loading = ref(false);
const defaultData = () => ({
  id: "",
  password: "",
});
const formData = ref<{ id: string; password: string }>(defaultData());

const formRef = ref<FormInstance>();
const rules = {
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 32, message: "密码长度在 6 到 32 个字符", trigger: "blur" },
  ],
};

const onSave = () => {
  if (!formRef.value) return;
  formRef.value.validate((valid, fields) => {
    if (valid) {
      onUpdatePassword();
    }
  });
};

const onUpdatePassword = async () => {
  try {
    loading.value = true;
    await apiUpdatePassword(formData.value.id, formData.value.password);
    ElMessage.success("密码修改成功");
    close();
  } catch (error: any) {
    console.log(error);
    ElMessage.error(error.msg ?? JSON.stringify(error));
  } finally {
    loading.value = false;
  }
};

const open = (id: string) => {
  formData.value.id = id;
  visible.value = true;
};

const close = () => {
  visible.value = false;
  formRef.value?.resetFields();
  formData.value = defaultData();
};

defineExpose({ open, close });
</script>

<style scoped></style>
