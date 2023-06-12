<template>
  <div class="navbar">
    <div class="navbar-left">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="navbar-right">
      <Setting></Setting>
    </div>
  </div>
  <el-divider />
</template>

<script lang="ts" setup>
import Breadcrumb from '@/layout/navbar/breadcrumb/index.vue'
import Setting from '@/layout/navbar/setting/index.vue'
</script>

<style scoped lang="scss">
.navbar {
  width: 100%;
  height: $layout-navbar-height;
  display: flex;
  justify-content: space-between;

  // 背景颜色渐变
  //background-image: linear-gradient(
  //  to right,
  //  rgb(232, 223, 223),
  //  rgb(201, 178, 178),
  //  rgb(197, 165, 165)
  //);

  .navbar-left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  .navbar-right {
    display: flex;
    align-items: center;
  }
}

.el-divider--horizontal {
  margin: 0;
}
</style>
