import Vue from 'vue';
import Router from 'vue-router';
import { constantRouterMap } from './constantRouter.js';
import { addAsyncRoutes } from './helper.js';
import UserInfo from '@/assets/js/userInfo.js';
import { getRootNodesByTraversUp } from '@/utils/util.about.js';
import { menuList } from './navMenuList.js';

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
  routes: constantRouterMap,
  isAddAsyncRoute: false, // 是否已经添加动态路由
});

const user = new UserInfo();
// 动态路由
const mainRoutes = {
  path: '/',
  name: 'home',
  component: () => import('@/views/Index.vue'),
  children: [],
};
let asyncRoutes = [];

router.beforeEach((to, from, next) => {
  if (user.isLogin()) {
    if (router.options.isAddAsyncRoute) {
      // 已添加动态路由，不符合动态路由的，重定向
      const hasRoutes = getRootNodesByTraversUp(
        asyncRoutes,
        (e) => e.path === to.path
      );
      if (hasRoutes.length) {
        next();
      } else {
        next('/');
      }
    } else {
      // 根据用户角色获取匹配的路由列表
      const permissionList = user.getInfo().privList || menuList;
      asyncRoutes = addAsyncRoutes(permissionList);
      mainRoutes.name="home-async"
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
    // 不需要登录的全局路由判断，不符合的重定向到登录页
    const hasRoutes = getRootNodesByTraversUp(
      constantRouterMap,
      (e) => e.path === to.path
    );
    if (hasRoutes.length) {
      next();
    } else {
      next('/login');
    }
  }
});

export default router;
