<template>
  <div class="box">
    <h1>hello world</h1>
    <el-button type="primary" :icon="Plus" @click="handler">测试</el-button>
    <SvgIcon name="music" color="red"></SvgIcon>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'

const handler = () => {
  // import.meta.env 获取环境变量信息
  //   {
  //   "VITE_APP_TITLE": "Vue3 后台管理模板",
  //       "VITE_APP_BASE_API": "/dev-api",
  //       "VITE_USER_NODE_ENV": "development",
  //       "BASE_URL": "/",
  //       "MODE": "development",
  //       "DEV": true,
  //       "PROD": false,
  //       "SSR": false
  // }
  console.log(import.meta.env)
}
</script>

<style scoped lang="scss">
.box {
  width: 600px;
  height: 400px;
  background: black;

  h1 {
    color: $color;
  }
}
</style>
