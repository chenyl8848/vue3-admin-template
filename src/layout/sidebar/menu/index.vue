<template>
  <template v-for="(item, index) in menuList">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item
        :index="item.path"
        v-if="!item.meta.isHidden"
        @click="routeJump"
      >
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
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
        @click="routeJump"
      >
        <template #title>
          <el-icon>
            <component :is="item.children[0].meta.icon"></component>
          </el-icon>
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
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>
          {{ item.meta.title }}
        </span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

defineProps(['menuList'])
let $router = useRouter()

// 路由跳转
const routeJump = (vc: any) => {
  $router.push(vc.index)
}
</script>

<script lang="ts">
export default {
  name: 'Menu',
}
</script>

<style scoped lang="scss"></style>
