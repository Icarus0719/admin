import {
  _import
} from './helper';

// 默认不需要权限的页面
export const constantRoutes = [{
    path: '/login',
    name: 'login',
    meta: {},
    component: _import('common/Login'),
  },
  {
    path: '/404',
    name: '404',
    meta: {},
    component: _import('common/404'),
  }
];