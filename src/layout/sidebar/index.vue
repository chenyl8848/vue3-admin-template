<template>
  <div>
    <!--  logo组件  -->
    <Logo></Logo>
    <!--  菜单组件  -->
    <!--  滚动组件  -->
    <el-scrollbar class="scroll">
      <el-menu
        background-color="#001529"
        text-color="white"
        active-text-color="yellowgreen"
      >
        <Menu :menuList="menuList"></Menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import Logo from '@/layout/sidebar/logo/index.vue'
import Menu from '@/layout/sidebar/menu/index.vue'
import useUserStore from '@/store/module/user'

let userStore = useUserStore()
const menuList = userStore.menuList
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
