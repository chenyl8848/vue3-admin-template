<template>
  <!--  <div v-show="contextMenuVisible">-->
  <!--    <ul-->
  <!--        :style="{ left: menuLeft + 'px', top: menuTop + 'px' }"-->
  <!--        class="contextmenu"-->
  <!--    >-->
  <!--      <li>-->
  <!--        <el-button link icon="Refresh" @click="btnRefresh">刷新</el-button>-->
  <!--      </li>-->
  <!--      <li>-->
  <!--        <el-button link icon="CircleClose" @click="btnCloseOther">-->
  <!--          关闭其他-->
  <!--        </el-button>-->
  <!--      </li>-->
  <!--      <li>-->
  <!--        <el-button link icon="CircleCloseFilled" @click="btnCloseAll">-->
  <!--          关闭所有-->
  <!--        </el-button>-->
  <!--      </li>-->
  <!--    </ul>-->
  <!--  </div>-->
  <!--  <el-tabs-->
  <!--      v-model="tagsViewStore.editableTabsValue"-->
  <!--      type="card"-->
  <!--      class="demo-tabs"-->
  <!--      closable-->
  <!--      @tabClick="tabClick"-->
  <!--      @tabRemove="tabRemove"-->
  <!--      @contextmenu.prevent.native="openContextMenu($event)"-->
  <!--  >-->
  <!--    <el-tab-pane-->
  <!--        v-for="item in tagsViewStore.visitedViews"-->
  <!--        :key="item.name"-->
  <!--        :label="item.title"-->
  <!--        :name="item.name"-->
  <!--    >-->
  <!--      <router-view v-slot="{ Component }">-->
  <!--        <transition name="fade">-->
  <!--          <component :is="Component" v-if="flag"></component>-->
  <!--        </transition>-->
  <!--      </router-view>-->
  <!--    </el-tab-pane>-->
  <!--  </el-tabs>-->

  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs
          v-model="tagsViewStore.editableTabsValue"
          type="card"
          class="demo-tabs"
          @tabClick="tabClick"
          @tabRemove="tabRemove"
      >
        <el-tab-pane
            v-for="item in tagsViewStore.visitedViews"
            :key="item.name"
            :label="item.title"
            :name="item.name"
            :closable="item.close"
        >
          <router-view v-slot="{ Component }">
            <transition name="fade">
              <component :is="Component" v-if="flag"></component>
            </transition>
          </router-view>
        </el-tab-pane>
      </el-tabs>
      <el-dropdown trigger="click">
        <el-button type="primary" size="small">
          更多
          <el-icon class="el-icon--right">
            <arrow-down/>
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="btnRefresh">
              <el-icon class="el-icon--right">
                <Refresh/>
              </el-icon>
              刷新
            </el-dropdown-item>
            <el-dropdown-item @click="btnCloseOther">
              <el-icon class="el-icon--right">
                <CircleClose/>
              </el-icon>
              关闭其他
            </el-dropdown-item>
            <el-dropdown-item @click="btnCloseAll">
              <el-icon class="el-icon--right">
                <CircleCloseFilled/>
              </el-icon>
              关闭所有
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, ref, watch} from 'vue'
import $mitt from '@/utils/mitt'
import useTagsViewStore from '@/store/module/tagsView'
import type {TabPaneName, TabsPaneContext} from 'element-plus'
import {useRoute, useRouter} from 'vue-router'

let isRefresh = ref(true)
let flag = ref(true)

let $router = useRouter()
let $route = useRoute()
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
  $router.push({path: tagsViewStore.visitedViews[pane.index].path})
}

const tabRemove = (name: TabPaneName) => {
  tagsViewStore.removeTagsView(name)
  $router.push({
    path: tagsViewStore.visitedViews[tagsViewStore.visitedViews.length - 1]
        .path,
  })
}

const contextMenuVisible = ref<boolean>(false)
const menuLeft = ref<number>(0)
const menuTop = ref<number>(0)
let currentPickedTabs = ''
const openContextMenu = (e) => {
  //防止默认菜单弹出
  e.preventDefault()

  if (e.target.id) {
    currentPickedTabs = e.target.id.split('-')[1]
    contextMenuVisible.value = true
    // 返回鼠标坐标点，并传递给菜单的绝对定位值
    menuLeft.value = e.clientX - 240
    menuTop.value = e.clientY - 30
  }
}

//隐藏菜单
watch(
    () => contextMenuVisible.value,
    () => {
      if (contextMenuVisible.value) {
        document.body.addEventListener('click', () => {
          contextMenuVisible.value = false
        })
      }
    },
)

const btnRefresh = () => {
  // 点击刷新按钮:路由组件销毁
  flag.value = false
  nextTick(() => {
    flag.value = true
  })
}

const btnCloseOther = () => {
  currentPickedTabs = $route.path as string
  if (currentPickedTabs !== '') {
    tagsViewStore.removeOtherTagsView(currentPickedTabs)
    $router.push({
      path: tagsViewStore.visitedViews[1].path,
    })
  }
}

const btnCloseAll = () => {
  currentPickedTabs = $route.path as string
  if (currentPickedTabs !== '') {
    tagsViewStore.removeAllTagsView()
    $router.push({
      path: tagsViewStore.visitedViews[0].path,
    })
  }
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

.contextmenu {
  width: 100px;
  margin: 0;
  border: 1px solid #ccc;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.2);
}

.contextmenu li {
  margin: 0;
  padding: 0px 2px;
  margin: 4px 0px;
}

.contextmenu li:hover {
  background: #f2f2f2;
  cursor: pointer;
}

.contextmenu li button {
  color: #2c3e50;
}

.tabs-box {
  background-color: var(--el-bg-color);

  .tabs-menu {
    position: relative;
    width: 100%;

    .el-dropdown {
      position: absolute;
      top: 8px;
      right: 13px;
    }

    :deep(.el-tabs) {
      .el-tabs__header {
        box-sizing: border-box;
        height: 40px;
        padding: 0 10px;
        //margin: 0;
        .el-tabs__nav-wrap {
          position: absolute;
          width: calc(100% - 110px);

          .el-tabs__nav {
            display: flex;
            border: none;

            .el-tabs__item {
              display: flex;
              align-items: center;
              justify-content: center;
              color: #afafaf;
              border: none;

              .tabs-icon {
                margin: 1.5px 4px 0 0;
                font-size: 15px;
              }

              .is-icon-close {
                margin-top: 1px;
              }

              &.is-active {
                color: var(--el-color-primary);

                &::before {
                  position: absolute;
                  bottom: 0;
                  width: 100%;
                  height: 0;
                  content: "";
                  border-bottom: 2px solid var(--el-color-primary) !important;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
