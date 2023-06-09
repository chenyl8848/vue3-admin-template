// 常用固定路由
export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    // 命名路由
    name: 'login',
  },
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
    name: 'layout',
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '404',
    name: 'any',
  },
]
