<template>
  <div class="box">
    <h1>hello world</h1>
    <el-button type="primary" :icon="Plus">测试</el-button>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
const fun = () => {
  console.log('fun fun')
}
fun()
</script>

<style scoped lang="scss">
.box {
  width: 600px;
  height: 400px;
  background: black;
  h1 {
    color: white;
  }
}
</style>
