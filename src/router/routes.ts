// 常用固定路由
export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    // 命名路由
    name: 'login',
    meta: {
      title: '登录',
      isHidden: true,
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
          isHidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('@/layout/index.vue'),
    name: 'auth',
    meta: {
      title: '权限管理',
      isHidden: true,
      icon: 'Lock',
    },
    redirect: '/auth/user',
    children: [
      {
        path: '/auth/user',
        component: () => import('@/views/auth/user/index.vue'),
        name: 'user',
        meta: {
          title: '用户管理',
          isHidden: false,
          icon: 'UserFilled',
        },
      },
      {
        path: '/auth/role',
        component: () => import('@/views/auth/role/index.vue'),
        name: 'role',
        meta: {
          title: '角色管理',
          isHidden: false,
          icon: 'Avatar',
        },
      },
      {
        path: '/auth/menu',
        component: () => import('@/views/auth/menu/index.vue'),
        name: 'menu',
        meta: {
          title: '菜单管理',
          isHidden: false,
          icon: 'Grid',
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      isHidden: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '404',
    name: 'any',
    meta: {
      title: '任意路由',
      isHidden: true,
    },
  },
]
