<template>
  <el-button icon="Refresh" circle />
  <el-button icon="FullScreen" circle />
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

let userStore = useUserStore()

const logout = () => {
  console.log('退出登录')
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
