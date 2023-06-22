<template>
  <div class="fullscreen">
    <!--    <el-button icon="FullScreen" circle @click="fullScreen" >-->
    <el-button circle @click="fullScreen">
      <template #icon v-if="!isFull">
        <SvgIcon name="full-screen"></SvgIcon>
      </template>
      <template #icon v-if="isFull">
        <SvgIcon name="exit-full"></SvgIcon>
      </template>
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

let isFull = ref<boolean>(false)

// 全屏
const fullScreen = () => {
  // DOM 对象的一个属性:可以用来判断当前是不是全屏模式[全屏:true,不是全屏:false]
  let full = document.fullscreenElement
  if (full) {
    // 是全屏，退出全屏模式
    isFull.value = false
    document.exitFullscreen()
  } else {
    // 不是全屏，进入全屏模式
    isFull.value = true
    document.documentElement.requestFullscreen()
  }
}
</script>

<style scoped lang="scss">
.fullscreen {
  margin-left: 12px;
}
</style>
