<template>
  <div class="fullscreen">
    <el-button icon="FullScreen" circle @click="fullScreen" />
  </div>
</template>

<script lang="ts" setup>
// 全屏
const fullScreen = () => {
  // DOM 对象的一个属性:可以用来判断当前是不是全屏模式[全屏:true,不是全屏:false]
  let full = document.fullscreenElement
  if (full) {
    // 是全屏，退出全屏模式
    document.exitFullscreen()
  } else {
    // 不是全屏，进入全屏模式
    document.documentElement.requestFullscreen()
  }
}
</script>

<style scoped lang="scss">
.fullscreen {
  margin-left: 12px;
}
</style>
