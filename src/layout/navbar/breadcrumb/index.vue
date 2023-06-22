<template>
  <!-- navbar 伸展框  -->
  <el-icon style="margin-right: 12px" @click="changeIcon">
    <component :is="isFold ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <!-- navbar 面包屑  -->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      :to="item.path"
      v-show="item.meta.title"
    >
<!--      <el-icon>-->
<!--        <component :is="item.meta.icon"></component>-->
<!--      </el-icon>-->
      <SvgIcon :name="item.meta.icon" width="16px" height="16px" style="margin-bottom: -2px"></SvgIcon>
      <span style="margin-left: 6px; margin-bottom: 24px">
        {{ item.meta.title }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import $mitt from '@/utils/mitt'

let $route = useRoute()

// 是否折叠
let isFold = ref(false)

const changeIcon = () => {
  isFold.value = !isFold.value
  $mitt.emit('isFold', isFold.value)
}
</script>

<style scoped lang="scss"></style>
