<template>
  <!--  svg:图标外层容器节点，内部需要与 use 标签结合使用  -->
  <svg :style="{ width, height }">
    <!-- xlink:href 执行用哪个标签;fill:可以设置图标颜色 -->
    <use :xlink:href="pref + name" :fill="color"></use>
  </svg>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
// 接收父组件传递过来的参数
defineProps({
  // xlink:href 属性值的前缀
  pref: {
    type: String,
    default: '#icon-',
  },
  // 图标的名字
  name: {
    type: String,
    required: true,
  },
  // 图标的颜色
  color: {
    type: String,
    default: '',
  },
  // 图标的宽度
  width: {
    type: String,
    default: '16px',
  },
  // 图标的高度
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<style scoped lang="scss"></style>
