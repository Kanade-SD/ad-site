<template>
  <el-dialog
    v-model="visible"
    title="添加卡片广告 (建议图片长宽比为16:9)"
    align-center
    @close="close"
  >
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="8rem">
      <el-form-item label="链接地址" prop="link">
        <el-input v-model="formData.link"></el-input>
      </el-form-item>
      <el-form-item label="图片类型" prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio value="link">第三方图片</el-radio>
          <el-radio value="upload">本地上传</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="formData.type === 'link'" label="图片地址" prop="imgUrl">
        <el-input v-model="formData.imgUrl"></el-input>
      </el-form-item>
      <el-form-item label="图片上传" v-if="formData.type === 'upload'" prop="file">
        <el-upload
          ref="uploadRef"
          v-model:file-list="formData.file"
          action=""
          list-type="picture-card"
          :http-request="onUpload"
          :limit="1"
          :auto-upload="false"
          :accept="'image/*'"
          :before-upload="beforeUpload"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
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
import { apiAddAdCard, apiImgUpload } from "@/api/api";
import type { AdCardType } from "@/types/data";
import {
  ElMessage,
  type FormInstance,
  type UploadInstance,
  type UploadRequestOptions,
} from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { ref } from "vue";

const visible = defineModel<boolean>("visible");

const emit = defineEmits<{
  (e: "onSuccess"): void;
}>();

const loading = ref(false);

type LinkType = { type: "link" | "upload" };
type FormFile = { file: File[] };
const defaultData = () => ({
  id: "",
  type: "link" as LinkType["type"],
  link: "",
  imgUrl: "",
  file: [],
});
const formData = ref<AdCardType & LinkType & FormFile>(defaultData());
const uploadRef = ref<UploadInstance>();

const formRef = ref<FormInstance>();
const rules = {
  link: [
    { required: true, message: "请输入链接", trigger: "blur" },
    { min: 2, max: 512, message: "长度在 2 到 512 个字符", trigger: "blur" },
  ],
  type: [{ required: true, message: "请选择图片类型", trigger: "change" }],
  imgUrl: [
    { required: true, message: "请输入图片链接", trigger: "blur" },
    { min: 2, max: 512, message: "长度在 2 到 512 个字符", trigger: "blur" },
  ],
  file: [{ required: true, message: "请选择图片", trigger: "change" }],
};

const beforeUpload = (file: File) => {
  // 允许jpg/png/jpeg/gif 文件上传
  const FILE_TYPE = ["image/jpeg", "image/png", "image/gif"];
  const MAX_SIZE = 1024 * 1024 * 2;

  if (file.size > MAX_SIZE) {
    ElMessage.error(" 图片文件最大不能超过2MB!");
    return false;
  }
  if (!FILE_TYPE.includes(file.type)) {
    ElMessage.error("请上传图片文件!");
    return false;
  }
  return true;
};

const onUpload = async (option: UploadRequestOptions) => {
  const _formData = new FormData();
  _formData.append("file", option.file);
  try {
    loading.value = true;
    const res = await apiImgUpload(_formData);
    formData.value.imgUrl = res.imgUrl;
    await onAdd();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const onSave = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      if (formData.value.type === "upload") {
        uploadRef.value?.submit();
      } else {
        onAdd();
      }
    }
  });
};

const onAdd = async () => {
  try {
    loading.value = true;
    await apiAddAdCard({
      id: formData.value.id,
      link: formData.value.link,
      imgUrl: formData.value.imgUrl,
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

const open = (ad?: AdCardType) => {
  visible.value = true;
  if (ad) formData.value = { ...formData.value, ...ad };
};

const close = () => {
  visible.value = false;
  formRef.value?.resetFields();
  formData.value = defaultData();
};

defineExpose({ open, close });
</script>

<style scoped></style>
