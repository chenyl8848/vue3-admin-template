<template>
  <!--  菜单组件  -->
  <!--  logo组件  -->
  <Logo></Logo>
  <!--  滚动组件  -->
  <el-scrollbar class="scroll">
    <el-menu
      background-color="#001529"
      text-color="white"
      active-text-color="yellowgreen"
      :collapse="isFold"
      :default-active="$route.path"
    >
      <Menu :menuList="menuList"></Menu>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import Logo from '@/layout/sidebar/logo/index.vue'
import Menu from '@/layout/sidebar/menu/index.vue'
import useUserStore from '@/store/module/user'
import { onMounted, ref } from 'vue'
import $mitt from '@/utils/mitt'
import { useRoute } from 'vue-router'
let $route = useRoute()

let userStore = useUserStore()
const menuList = userStore.menuList
let isFold = ref()

onMounted(() => {
  $mitt.on('isFold', (param: boolean) => {
    isFold.value = param
  })
})
</script>

<style scoped lang="scss">
.scroll {
  width: 100%;
  height: calc(100vh - $layout-sidebar-logo-height);

  .el-menu {
    border-right: none;
  }
}
</style>
