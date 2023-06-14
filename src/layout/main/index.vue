<template>
  <el-tabs
    v-model="tagsViewStore.editableTabsValue"
    type="card"
    class="demo-tabs"
    closable
    @tabClick="tabClick"
    @tabRemove="tabRemove"
  >
    <el-tab-pane
      v-for="item in tagsViewStore.visitedViews"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" v-if="flag"></component>
        </transition>
      </router-view>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import $mitt from '@/utils/mitt'
import useTagsViewStore from '@/store/module/tagsView'
import type { TabPaneName, TabsPaneContext } from 'element-plus'
import { useRouter } from 'vue-router'

let isRefresh = ref(true)
let flag = ref(true)

let $router = useRouter()
let tagsViewStore = useTagsViewStore()

onMounted(() => {
  $mitt.on('refresh', (param: boolean) => {
    isRefresh.value = param
  })
})

watch(
  () => isRefresh.value,
  () => {
    // 点击刷新按钮:路由组件销毁
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)

const tabClick = (pane: TabsPaneContext, ev: Event) => {
  $router.push({ path: tagsViewStore.visitedViews[pane.index].path })
}

const tabRemove = (name: TabPaneName) => {
  tagsViewStore.removeTagsView(name)
  $router.push({
    path: tagsViewStore.visitedViews[tagsViewStore.visitedViews.length - 1]
      .path,
  })
}
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
