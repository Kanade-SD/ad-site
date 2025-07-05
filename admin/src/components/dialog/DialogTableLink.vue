<template>
  <el-dialog v-model="visible" title="设置列表链接" align-center @close="close">
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="8rem">
      <el-form-item label="链接文字" prop="text">
        <el-input v-model="formData.text"></el-input>
      </el-form-item>
      <el-form-item label="链接地址" prop="link">
        <el-input v-model="formData.link"></el-input>
      </el-form-item>
      <el-form-item label="链接文字颜色" prop="textColor">
        <el-color-picker
          v-model="formData.textColor"
          :predefine="predefineColors"
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="链接背景颜色" prop="bgColor">
        <el-color-picker v-model="formData.bgColor" :predefine="predefineColors"></el-color-picker>
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
import { apiAddTableLink, apiUpdateTableLink } from "@/api/api";
import type { LinkType } from "@/types/data";
import { ElMessage, type FormInstance } from "element-plus";
import { ref } from "vue";
import { predefineColors } from "@/types/color";

const visible = defineModel<boolean>("visible");

const emit = defineEmits<{
  (e: "onSuccess"): void;
}>();

const loading = ref(false);

const defaultData = (): LinkType => ({
  id: "",
  text: "",
  link: "",
  textColor: "",
  bgColor: "",
});
const formData = ref<LinkType>(defaultData());

const formRef = ref<FormInstance>();
const rules = {
  text: [
    { required: true, message: "请输入名称", trigger: "blur" },
    { min: 2, max: 32, message: "长度在 2 到 32 个字符", trigger: "blur" },
  ],
  link: [
    { required: true, message: "请输入链接", trigger: "blur" },
    { min: 2, max: 512, message: "长度在 2 到 512 个字符", trigger: "blur" },
  ],
};

const onSave = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      if (!formData.value.id || formData.value.id === "") {
        addLink();
      } else {
        updateLink();
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

const addLink = async () => {
  try {
    loading.value = true;
    await apiAddTableLink({
      text: formData.value.text,
      link: formData.value.link,
      textColor: formData.value.textColor,
      bgColor: formData.value.bgColor,
    });
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

const updateLink = async () => {
  try {
    loading.value = true;
    await apiUpdateTableLink({
      id: formData.value.id,
      text: formData.value.text,
      link: formData.value.link,
      textColor: formData.value.textColor,
      bgColor: formData.value.bgColor,
    });
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

const open = (link?: LinkType) => {
  visible.value = true;
  if (link) formData.value = { ...formData.value, ...link };
};

const close = () => {
  visible.value = false;
  formRef.value?.resetFields();
  formData.value = defaultData();
};

defineExpose({ open, close });
</script>

<style scoped></style>
