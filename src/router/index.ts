// 引入路由
import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from '@/router/routes'

// 创建路由管理器
let router = createRouter({
  // 路由模式 history
  history: createWebHistory(),
  routes: constantRoute,
  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
