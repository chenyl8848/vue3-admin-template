<template>
  <div class='box'>
    <i-frame :src='docUrl'></i-frame>
  </div>
</template>

<script lang='ts' setup>
import iFrame from '@/components/iFrame/index.vue'
import { computed } from 'vue'

const docUrl = computed(() => {
  return 'http://localhost:8080/doc.html'
})
</script>

<style scoped lang='scss'>
.box {
  height: calc(100vh - $layout-navbar-height - 80px);
}
</style>