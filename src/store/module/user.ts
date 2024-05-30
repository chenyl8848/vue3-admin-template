// 引入 pinia
import { defineStore } from 'pinia'
import {
  LoginRequest,
  LoginResponse,
  UserInfoResponse,
} from '@/api/auth/user/type'
import { getUserInfo } from '@/api/auth/user/index'
import { login } from '@/api/auth/login/index'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token'
import { constantRoute } from '@/router/routes'
import { UserState } from '@/store/module/types/type'
import { RouteRecordRaw } from 'vue-router'
import { SysMenu, SysMenuEnum } from '@/api/auth/menu/type'
import router from '@/router'

const modules = import.meta.glob('@/**/*.vue')

// 定义 userStore
const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menus: constantRoute,
      username: '',
      avatar: '',
      btnPermissions: [],
    }
  },
  actions: {
    // 用户登录
    userLogin: async function (data: LoginRequest) {
      const result: LoginResponse = await login(data)
      // const result: LoginResponse = {
      //   code: 200,
      //   message: '登录成功',
      //   data: 'Admin Token',
      // }
      if (result.code === 200) {
        this.token = result.data
        SET_TOKEN(result.data)

        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    // 获取用户信息
    getUserInfo: async function () {
      const result: UserInfoResponse = await getUserInfo()
      // const result: UserInfoResponse = {
      //   code: 200,
      //   message: '获取用户信息成功',
      //   data: {
      //     userId: 1,
      //     avatar:
      //       'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      //     username: 'admin',
      //     password: '111111',
      //     desc: '平台管理员',
      //     roles: ['平台管理员'],
      //     buttons: ['cuser.detail'],
      //     routes: ['home'],
      //     token: 'Admin Token',
      //   },
      // }
      if (result.code === 200) {
        this.username = result.data.username
        this.avatar =
          result.data.avatar ||
          'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        this.btnPermissions = result.data.buttons
        this.menus.value = mergeMenuRoutes(
          generateDynamicRoutes(result.data.menus),
          constantRoute,
        )

        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    // 用户退出登录
    userLogout: function () {
      REMOVE_TOKEN()
      this.username = ''
      this.avatar = ''

      // 退出登录的时候，清空路由
      router.replace({ path: '/login' })
      location.reload()
    },
  },
  getters: {},
})

// 合并菜单路由
const mergeMenuRoutes = (
  dynamicRoutes: Array<RouteRecordRaw>,
  constantRoutes: Array<RouteRecordRaw>,
): Array<RouteRecordRaw> => {
  let routes: Array<RouteRecordRaw> = []
  dynamicRoutes.forEach((item) => {
    constantRoutes.push(item)
  })
  return routes
}

// 生成动态路由
const generateDynamicRoutes = (
  menus: Array<SysMenu>,
): Array<RouteRecordRaw> => {
  let routes = []
  menus.forEach((menu) => {
    let children = []
    if (menu.children) {
      children = generateDynamicRoutes(menu.children)
    }
    let route = {
      // 路由的路径
      path:
        menu.isExternal === SysMenuEnum.EXTERNAL ? '/' + menu.path : menu.path,
      // 路由名
      name: menu.menuCode,
      // 路由所在组件
      // component: () => import(`@/${menu.component}/index.vue`),
      component: modules[`/src/${menu.component}/index.vue`],
      meta: {
        title: menu.menuName,
        icon: menu.menuIcon,
        isHidden: menu.isHidden === SysMenuEnum.HIDDEN,
        isExternal: menu.isExternal === SysMenuEnum.EXTERNAL,
      },
      // 路由的子路由
      children: children.length > 0 ? children : null,
    }
    router.addRoute(route as RouteRecordRaw)
    routes.push(route)
  })
  return routes
}

// 暴露 userStore
export default useUserStore
