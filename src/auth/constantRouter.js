// 默认不需要权限的页面
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    meta: {},
    component: () => import('@/views/Login.vue'),
  },
];
