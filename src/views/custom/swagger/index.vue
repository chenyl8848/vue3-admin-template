<template>
  <div class="box">
    <IFrame :src="srcUrl"></IFrame>
  </div>
</template>

<script lang="ts" setup>
import IFrame from '@/components/iFrame/index.vue'
import { ref } from 'vue'

const srcUrl = ref<string>('http://localhost:8080/doc.html')
</script>

<style scoped lang="scss">
.box {
  height: calc(100vh - $layout-navbar-height - 100px);
  overflow: auto;
}
</style>
