<template>
  <template v-for="(item, index) in menuList">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item
        :index="item.path"
        v-if="!item.meta.isHidden"
        @click="routeJump(item)"
      >
        <!--        <el-icon>-->
        <!--          <component :is="item.meta.icon"></component>-->
        <!--        </el-icon>-->
        <SvgIcon
          :name="item.meta.icon"
          width="20px"
          height="20px"
          color="white"
          style="margin-right: 6px"
        ></SvgIcon>
        <template #title>
          <span>
            {{ item.meta.title }}
          </span>
        </template>
      </el-menu-item>
    </template>
    <!--  只有一个子路由  -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item
        :index="item.children[0].path"
        v-if="!item.children[0].meta.isHidden"
        @click="routeJump(item.children[0])"
      >
        <!--        <el-icon>-->
        <!--          <component :is="item.children[0].meta.icon"></component>-->
        <!--        </el-icon>-->
        <SvgIcon
          :name="item.children[0].meta.icon"
          width="20px"
          height="20px"
          color="white"
          style="margin-right: 6px"
        ></SvgIcon>
        <template #title>
          <span>
            {{ item.children[0].meta.title }}
          </span>
        </template>
      </el-menu-item>
    </template>
    <!--  有子路由且子路由个数大于一  -->
    <el-sub-menu
      v-if="item.children && item.children.length > 1"
      :index="item.path"
    >
      <template #title>
        <!--                        <el-icon>-->
        <!--                          <component :is="item.meta.icon"></component>-->
        <!--                        </el-icon>-->
        <SvgIcon
          :name="item.meta.icon"
          width="20px"
          height="20px"
          color="white"
          style="margin-right: 6px"
        ></SvgIcon>
        <span>
          {{ item.meta.title }}
        </span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script lang="ts" setup>
import { RouteRecordRaw, useRouter } from 'vue-router'
import { onMounted, reactive, ref, watch,defineProps } from 'vue'
import { SysMenuEnum } from '@/api/auth/menu/type'
import $mitt from '@/utils/mitt'

defineProps(['menuList'])
let $router = useRouter()

// 路由跳转
const routeJump = (item: RouteRecordRaw) => {
  if (item.meta?.isExternal) {
    window.open(item.path.substring(1, item.path.length))
  } else {
    $router.push(item.path)
  }
}
</script>

<script lang="ts">
export default {
  name: 'Menu',
}
</script>

<style scoped lang="scss"></style>
