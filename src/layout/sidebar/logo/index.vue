<template>
  <router-link to='/' class='logo'>
    <img :src='setting.LOGO_PATH' />
    <transition>
      <p v-show='!isFold'>
        {{ setting.LOGO_TITLE }}
      </p>
    </transition>
  </router-link>
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import $mitt from '@/utils/mitt'
import setting from '@/setting'

let isFold = ref()
onMounted(() => {
  $mitt.on('isFold', (params: boolean) => {
    isFold.value = params
  })
})
</script>

<style scoped lang='scss'>
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

    a {
      color: white;
      text-decoration: none;
    }
  }
}

a {
  color: white;
  text-decoration: none;
}

.v-enter-from {
  opacity: 0;
}

.v-enter-active {
  transition: 1s;
}

.v-enter-to {
  opacity: 1;
}
</style>

