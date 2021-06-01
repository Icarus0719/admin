import Vue from 'vue';
import Router from 'vue-router';
import {
  constantRoutes
} from './constantRoutes.js';
import {
  addAsyncRoutes,
  hasCurrentRoute
} from './helper.js';
import UserInfo from '@/assets/js/userInfo.js';
import {
  menuList
} from './menuList.js';

// push
const originalPush = Router.prototype.push;
Router.prototype.push = pushRouter;

function pushRouter(location) {
  return originalPush.call(this, location).catch((err) => err);
}
// replace
const originalReplace = Router.prototype.replace;
Router.prototype.replace = replaceRouter;

function replaceRouter(location) {
  return originalReplace.call(this, location).catch((err) => err);
}

Vue.use(Router);
const router = new Router({
  base: process.env.BASE_URL,
  routes: constantRoutes,
  isAddAsyncRoute: false, // 是否已经添加动态路由
  isConstantRoute: false, // 是否是常态路由
});

const user = new UserInfo();
// 动态路由
const mainRoutes = {
  path: '/',
  name: 'home',
  component: () => import('@/views/Index.vue'),
  redirect: '',
  children: [],
};
let asyncRoutes = [];

router.beforeEach((to, from, next) => {
  if (user.isLogin()) {
    if (router.options.isAddAsyncRoute) {
      hasCurrentRoute(to, asyncRoutes) ? next() : next(mainRoutes.redirect)
    } else {
      // 获取动态路由列表
      const permissionList = menuList;
      asyncRoutes = addAsyncRoutes(permissionList);
      mainRoutes.children = asyncRoutes;
      mainRoutes.redirect = asyncRoutes.length ? asyncRoutes[0].path : '';
      router.addRoute(mainRoutes);
      router.options.isAddAsyncRoute = true;
      next({
        ...to,
        replace: true,
      });
    }
  } else {
    hasCurrentRoute(to, constantRoutes) ? next() : next('/login')
  }
});

export default router;