<template>
  <div class="logo">
    <img :src="setting.LOGO_PATH" />
    <p>{{ setting.LOGO_TITLE }}</p>
  </div>
</template>

<script lang="ts" setup>
import setting from '@/setting'
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $layout-sidebar-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px;

  img {
    width: 40px;
    height: 40px;
  }

  p {
    font-size: $layout-sidebar-logo-title-size;
    margin-left: 12px;
  }
}
</style>
