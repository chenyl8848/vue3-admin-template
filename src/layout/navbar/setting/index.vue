<template>
  <el-button icon="Refresh" circle @click="refresh" />
  <Search></Search>
  <FullScreen></FullScreen>
  <Theme></Theme>
  <Message></Message>
  <User></User>
</template>

<script lang="ts" setup>
import Search from '@/layout/navbar/setting/search/index.vue'
import FullScreen from '@/layout/navbar/setting/fullscreen/index.vue'
import Theme from '@/layout/navbar/setting/theme/index.vue'
import Message from '@/layout/navbar/setting/message/index.vue'
import User from '@/layout/navbar/setting/user/index.vue'

import $mitt from '@/utils/mitt'

let isRefresh = true

// 刷新
const refresh = () => {
  isRefresh = !isRefresh
  $mitt.emit('refresh', isRefresh)
}
</script>

<style scoped lang="scss"></style>
