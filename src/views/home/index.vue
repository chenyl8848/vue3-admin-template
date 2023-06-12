<template>
  <div>
    <h1>我是首页</h1>
    <el-button type="primary">Primary</el-button>
    <p v-for="item in 200" :key="item" class="scrollbar-demo-item">
      {{ item }}
    </p>
  </div>
</template>
