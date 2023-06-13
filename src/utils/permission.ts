// 全局路由首位
import router from '@/router'
import store from '@/store'
import { GET_TOKEN } from '@/utils/token'
import useUserStore from '@/store/module/user'
import setting from '@/setting'
import NProgress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
import useTagsViewStore from '@/store/module/tagsView'
NProgress.configure({ showSpinner: false })

let userStore = useUserStore(store)
let tagsViewStore = useTagsViewStore(store)

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 获取用户 token
  let token = GET_TOKEN()
  // 获取用户 username
  let username = userStore.username

  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
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
  document.title = `${to.meta.title} - ${setting.DOCUMENT_TITLE}`
  tagsViewStore.addTagsView({
    title: to.meta.title,
    name: to.path,
    path: to.path,
  })
  tagsViewStore.changeEditTabs(to.path)
  NProgress.done()
})
