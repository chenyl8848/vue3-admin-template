// 全局路由首位
import router from '@/router'
import store from '@/store'
import { GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import useUserStore from '@/store/module/user'
import setting from '@/setting'
import NProgress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
import useTagsViewStore from '@/store/module/tagsView'

NProgress.configure({ showSpinner: false })

let userStore = useUserStore(store)
let tagsViewStore = useTagsViewStore(store)

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // 获取用户 token
  let token = GET_TOKEN()
  // 获取用户 username
  let username = userStore.username

  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (username && username !== '') {
        next()
      } else {
        // 获取用户信息
        try {
          await userStore.getUserInfo()

          // 如果 addRoute 并未完成，路由守卫会一层一层的执行执行，直到 addRoute 完成，找到对应的路由
          // next({...to, replace: true })
          next({ ...to })
        } catch (error) {
          console.log(error)
          REMOVE_TOKEN()
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
  if (!to.meta.isHidden) {
    tagsViewStore.addTagsView({
      title: to.meta.title,
      name: to.path,
      path: to.path,
      close: true,
    })
    tagsViewStore.changeEditTabs(to.path)
  }
  NProgress.done()
})
