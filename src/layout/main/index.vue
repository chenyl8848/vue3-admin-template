<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag"></component>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import $mitt from '@/utils/mitt'

let isRefresh = ref(true)
let flag = ref(true)
onMounted(() => {
  $mitt.on('refresh', (param: boolean) => {
    isRefresh.value = param
    console.log(param, isRefresh.value)
  })
})

watch(
  () => isRefresh.value,
  () => {
    // 点击刷新按钮:路由组件销毁
    flag.value = false
    nextTick(() => {
      console.log('hhhhhh')
      flag.value = true
    })
  },
)
</script>

<style scoped lang="scss">
.fade-entry-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  opacity: 1;
  transform: scale(1);
}
</style>
