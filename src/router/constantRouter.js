// 默认不需要权限的全局页面
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    meta: {},
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/404',
    name: '404',
    meta: {},
    component: () => import('@/views/common/404.vue'),
  },
];
