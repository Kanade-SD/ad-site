<template>
  <div>
    <el-card>
      <template #header>
        <div class="flex justify-between items-center">
          <div>网站管理</div>
          <el-button type="success" @click="save" :loading="loading">保存</el-button>
        </div>
      </template>
      <div v-loading="loading">
        <el-form :model="siteData">
          <div class="flex flex-col gap-8">
            <div class="flex flex-col gap-4">
              <h2 class="text-base font-bold">网站信息</h2>
              <el-form-item label="网站名称" prop="siteTitle">
                <el-input v-model="siteData.siteName"></el-input>
              </el-form-item>
            </div>

            <div class="flex flex-col gap-4">
              <h2 class="text-base font-bold">跑马灯设置</h2>
              <div class="grid grid-cols-4 gap-4">
                <el-form-item label="跑马灯文字" prop="marquee.text">
                  <el-input v-model="siteData.marquee.text"></el-input>
                </el-form-item>
                <el-form-item label="跑马灯链接" prop="marquee.link">
                  <el-input v-model="siteData.marquee.link"></el-input>
                </el-form-item>
                <el-form-item label="跑马灯文字颜色" prop="marquee.textColor">
                  <el-color-picker
                    v-model="siteData.marquee.textColor"
                    :predefine="predefineColors"
                  ></el-color-picker>
                </el-form-item>
                <el-form-item label="跑马灯背景颜色" prop="marquee.bgColor">
                  <el-color-picker
                    v-model="siteData.marquee.bgColor"
                    :predefine="predefineColors"
                  ></el-color-picker>
                </el-form-item>
              </div>
            </div>

            <LinksContent :site-data="siteData" @on-success="apiGetData" />
            <AdListContent :site-data="siteData" @on-success="apiGetData" />
            <AdAppContent :site-data="siteData" @on-success="apiGetData" />
            <AdCardContent :site-data="siteData" @on-success="apiGetData" />
            <AdTableContent :site-data="siteData" @on-success="apiGetData" />
            <AdFloatContent :site-data="siteData" @on-success="apiGetData" />
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import LinksContent from "./LinksContent.vue";
import AdListContent from "./AdListContent.vue";
import AdTableContent from "./AdTableContent.vue";
import AdAppContent from "./AdAppContent.vue";
import AdCardContent from "./AdCardContent.vue";
import AdFloatContent from "./AdFloatContent.vue";
import { apiGetAllData, apiUpdateData } from "@/api/api";
import { ElMessage } from "element-plus";
import type { WebsiteData } from "@/types/data";
import { predefineColors } from "@/types/color";

const loading = ref(false);

const siteData = ref<WebsiteData>({
  siteName: "",
  marquee: {
    text: "",
    link: "",
    textColor: "",
    bgColor: "",
  },
  links: [],
  adList: [],
  adTable: [],
  adApp: [],
  adCard: [],
  adFloat: [],
});

const save = async () => {
  try {
    loading.value = true;
    await apiUpdateData(siteData.value);
    ElMessage.success("保存成功");
    await apiGetAllData();
  } catch (error: any) {
    console.log(error);
    ElMessage.error(error.msg ?? JSON.stringify(error));
  } finally {
    loading.value = false;
  }
};

const apiGetData = async () => {
  try {
    loading.value = true;
    const res = await apiGetAllData();
    siteData.value = {
      ...siteData.value,
      ...res,
    };
  } catch (error: any) {
    console.log(error);
    ElMessage.error(error.msg ?? JSON.stringify(error));
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  apiGetData();
});
</script>

<style scoped></style>
