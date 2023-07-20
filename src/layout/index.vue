<template>
  <div class="layout-container">
    <div class="layout-sidebar" :class="{ fold: isFold }">
      <Sidebar></Sidebar>
    </div>
    <div class="layout-navbar" :class="{ fold: isFold }">
      <Navbar></Navbar>
    </div>
    <div class="layout-main" :class="{ fold: isFold }">
      <Main></Main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from '@/layout/sidebar/index.vue'
import Navbar from '@/layout/navbar/index.vue'
import Main from '@/layout/main/index.vue'
import TagsView from '@/layout/navbar/tagsview/index.vue'

import { onMounted, ref, watch } from 'vue'
import $mitt from '@/utils/mitt'

let isFold = ref()
onMounted(() => {
  $mitt.on('isFold', (params: boolean) => {
    isFold.value = params
  })
})
</script>

<style lang="scss" scoped>
.layout-container {
  width: 100%;
  height: 100vh;
  //background-color: skyblue;

  .layout-sidebar {
    //color: white;
    width: $layout-sidebar-width;
    height: 100vh;
    background-color: $layout-sidebar-background-color;
    transition: all 0.3s;

    &.fold {
      width: $layout-sidebar-min-width;
    }
  }

  .layout-navbar {
    position: fixed;
    width: calc(100% - $layout-sidebar-width);
    height: $layout-navbar-height;
    top: 0px;
    left: $layout-sidebar-width;
    transition: all 0.3s;

    &.fold {
      width: calc(100% - $layout-sidebar-min-width);
      left: $layout-sidebar-min-width;
    }
  }

  .layout-main {
    position: absolute;
    width: calc(100% - $layout-sidebar-width);
    height: calc(100vh - $layout-navbar-height);
    left: $layout-sidebar-width;
    top: $layout-navbar-height;
    padding: 12px;
    overflow: auto;
    transition: all 0.3s;
    //background-color: #ffffff;

    &.fold {
      width: calc(100% - $layout-sidebar-min-width);
      left: $layout-sidebar-min-width;
    }
  }
}
</style>
