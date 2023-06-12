<template>
  <el-button icon="Refresh" circle @click="refresh" />
  <el-button icon="FullScreen" circle @click="fullScreen" />
  <img :src="userStore.avater" />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import useUserStore from '@/store/module/user'
import { useRoute, useRouter } from 'vue-router'
import $mitt from '@/utils/mitt'

let $router = useRouter()
let $route = useRoute()

let userStore = useUserStore()

let isRefresh = false
// 刷新
const refresh = () => {
  isRefresh = !isRefresh
  $mitt.emit('refresh', isRefresh)
}

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

// 退出登录
const logout = async () => {
  await userStore.userLogout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<style scoped lang="scss">
img {
  width: 32px;
  height: 32px;
  margin: 0px 10px;
  border-radius: 50%;
}

.el-dropdown {
  margin-right: 12px;
}
</style>
