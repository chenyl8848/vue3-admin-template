// 全局路由首位
import router from '@/router'
import store from '@/store'
import { GET_TOKEN } from '@/utils/token'
import useUserStore from '@/store/module/user'
import setting from '@/setting'

let userStore = useUserStore(store)

router.beforeEach((to, from, next) => {
  // 获取用户 token
  let token = GET_TOKEN()
  // 获取用户 username
  let username = userStore.username

  if (token) {
    if (username) {
      next()
    } else {
      // 获取用户信息
      try {
        userStore.getUserInfo()
        next()
      } catch (error) {
        next({ path: '/login' })
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

router.afterEach((to, from, next) => {
  document.title = `${setting.DOCUMENT_TITLE} - ${to.meta.title}`
})
