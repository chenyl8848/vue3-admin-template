<template>
  <div>
    <img :src="userStore.avatar" />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="gotoGithub">
            <SvgIcon name="github"></SvgIcon>
            <span style="margin-left: 2px">Github</span>
          </el-dropdown-item>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import useUserStore from '@/store/module/user'
import { useRoute, useRouter } from 'vue-router'
import setting from '@/setting'

let $router = useRouter()
let $route = useRoute()

let userStore = useUserStore()

const gotoGithub = () => {
  window.open(setting.GITHUB_ADDRESS)
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
  margin: 0px 12px;
  border-radius: 50%;
}

.el-dropdown {
  margin-right: 12px;
  margin-top: 6px;
}
</style>
