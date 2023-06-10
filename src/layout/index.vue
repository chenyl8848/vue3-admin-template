<template>
  <div class="layout-container">
    <div class="layout-sidebar">
      <Sidebar></Sidebar>
    </div>
    <div class="layout-navbar">
      <Navbar></Navbar>
    </div>
    <div class="layout-main">
      <Main></Main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from '@/layout/sidebar/index.vue'
import Navbar from '@/layout/navbar/index.vue'
import Main from '@/layout/main/index.vue'

</script>

<style lang="scss" scoped>
.layout-container {
  width: 100%;
  height: 100vh;
  //background-color: skyblue;

  .layout-sidebar {
    color: white;
    width: $layout-sidebar-width;
    height: 100vh;
    background-color: $layout-sidebar-background-color;
  }

  .layout-navbar {
    position: fixed;
    width: calc(100% - $layout-sidebar-width);
    height: $layout-navbar-height;
    top: 0px;
    left: $layout-sidebar-width;
    transition: all 0.3s;
  }

  .layout-main {
    position: absolute;
    width: calc(100% - $layout-sidebar-width);
    height: calc(100vh - $layout-navbar-height);
    left: $layout-sidebar-width;
    top: $layout-navbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
  }
}
</style>