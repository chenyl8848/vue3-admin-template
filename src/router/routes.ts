// 常用固定路由
import { RouteRecordRaw } from 'vue-router'

// 扩展 RouteMeta 接口
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    isHidden?: boolean
    isExternal?: boolean
    icon?: string
  }
}

export const constantRoute: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    // 命名路由
    name: 'login',
    meta: {
      title: '登录',
      isHidden: true,
      isExternal: false,
    },
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    // meta: {
    //   title: '主页',
    //   isHidden: true,
    // },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页',
          // icon: 'HomeFilled',
          icon: 'home',
          isHidden: false,
          isExternal: false,
        },
      },
    ],
  },
  // {
  //   path: '/auth',
  //   component: () => import('@/layout/index.vue'),
  //   name: 'auth',
  //   meta: {
  //     title: '权限管理',
  //     isHidden: true,
  //     // icon: 'Lock',
  //     icon: 'lock',
  //   },
  //   redirect: '/auth/user',
  //   children: [
  //     {
  //       path: '/auth/user',
  //       component: () => import('@/views/auth/user/index.vue'),
  //       name: 'user',
  //       meta: {
  //         title: '用户管理',
  //         isHidden: false,
  //         // icon: 'UserFilled',
  //         icon: 'user',
  //       },
  //     },
  //     {
  //       path: '/auth/role',
  //       component: () => import('@/views/auth/role/index.vue'),
  //       name: 'role',
  //       meta: {
  //         title: '角色管理',
  //         isHidden: false,
  //         // icon: 'Avatar',
  //         icon: 'role',
  //       },
  //     },
  //     {
  //       path: '/auth/menu',
  //       component: () => import('@/views/auth/menu/index.vue'),
  //       name: 'menu',
  //       meta: {
  //         title: '菜单管理',
  //         isHidden: false,
  //         // icon: 'Grid',
  //         icon: 'menu',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/system',
  //   component: () => import('@/layout/index.vue'),
  //   name: 'system',
  //   meta: {
  //     title: '系统管理',
  //     isHidden: true,
  //     // icon: 'Tools',
  //     icon: 'system',
  //   },
  //   redirect: '/system/dict',
  //   children: [
  //     {
  //       path: '/system/dict',
  //       component: () => import('@/views/system/dict/index.vue'),
  //       name: 'dict',
  //       meta: {
  //         title: '字典管理',
  //         isHidden: false,
  //         // icon: 'Collection',
  //         icon: 'dict',
  //       },
  //     },
  //     {
  //       path: '/system/log',
  //       component: () => import('@/views/system/log/index.vue'),
  //       name: 'log',
  //       meta: {
  //         title: '操作日志',
  //         isHidden: false,
  //         // icon: 'Operation',
  //         icon: 'log',
  //       },
  //     },
  //   ],
  // },
  {
    // path: '/404',
    path: '/:catchAll(.*)',
    component: () => import('@/views/404/index.vue'),
    // name: '404',
    meta: {
      title: '404',
      isHidden: true,
      isExternal: false,
    },
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: '404',
  //   name: 'any',
  //   meta: {
  //     title: '任意路由',
  //     isHidden: true,
  //   },
  // },
]
