import Vue from 'vue'
import Router from 'vue-router'
import UserInfo from '@/assets/js/userInfo.js'
import { constantRouterMap } from '@/auth/constantRouter.js'
import { asyncSuperAdminMap, routerMatch } from '@/auth/asyncRouter.js'
import { getRootNodesByTraversUp } from '@/utils/util.about.js'

// push
const originalPush = Router.prototype.push
Router.prototype.push = pushRouter

function pushRouter (location) {
  return originalPush.call(this, location).catch(err => err)
}
// replace
const originalReplace = Router.prototype.replace
Router.prototype.replace = replaceRouter

function replaceRouter (location) {
  return originalReplace.call(this, location).catch(err => err)
}

Vue.use(Router)
const router = new Router({
  base: process.env.BASE_URL,
  routes: constantRouterMap
})

const user = new UserInfo()
let matchRouters = []

router.beforeEach((to, from, next) => {
  if (user.isLogin()) {
    if (matchRouters.length) {
      const hasNodes = getRootNodesByTraversUp(
        matchRouters,
        e => e.path === to.path
      )
      if (hasNodes.length) {
        next()
      } else {
        next('/index')
      }
    } else {
      // 根据用户角色获取匹配的路由列表
      const permissionList = user.getInfo().privList || []
      const matchRouterList = routerMatch(asyncSuperAdminMap, permissionList)
      matchRouters = matchRouterList
      router.addRoutes(matchRouters)
      next({
        ...to,
        replace: true
      })
    }
  } else {
    const hasNodes = getRootNodesByTraversUp(
      constantRouterMap,
      e => e.path === to.path
    )
    if (hasNodes.length) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
