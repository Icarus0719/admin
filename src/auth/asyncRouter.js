// 异步路由，超管权限页面
export const asyncSuperAdminMap = [
  {
    path: '/index',
    component: () => import('@/views/Index.vue'),
    meta: {},
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {},
        component: () => import('@/views/Home')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    meta: {},
    component: () => import('@/components/404.vue')
  }
]

var isTest = true
/**
 * 根据登录返回的权限列表获取匹配的路由对象，并设置meta属性
 * @param {array} permission 权限列表
 */
export const routerMatch = permission => {
  if (!isTest) {
    // 获取权限页面列表，根据后台数据结构进行处理
    let permissionInfo = getPermissionInfo(permission)
    // 配置新路由表
    setNewAsyncRouters([asyncSuperAdminMap[0]], permissionInfo)
    // 新路由表的根节点需要重新设置redirect属性
    asyncSuperAdminMap[0].redirect = asyncSuperAdminMap[0].children.length
      ? asyncSuperAdminMap[0].children[0].path
      : '/404'
  }
  return asyncSuperAdminMap

  /**
   * 处理后台返回的权限列表数据，获取权限页面信息
   * 当前后台返回的权限列表结构是[{children:[],node:{url,name}},...]
   * @param {*} permission
   * @param {*} [newArr=[]]
   * @returns 返回的是所有权限页面路径的数组项
   */
  function getPermissionInfo (permission, newArr = []) {
    permission.forEach(e => {
      newArr.push(e.node.url)
      if (e.children && e.children.length) {
        getPermissionInfo(e.children, newArr)
      }
    })
    return newArr
  }

  // 根据权限信息中的权限路径，重新设置异步路由表
  function setNewAsyncRouters (asyncRouter, permissionInfo) {
    if (Object.prototype.toString.call(asyncRouter) !== '[object Array]')
      return false
    if (Object.prototype.toString.call(permissionInfo) !== '[object Array]')
      return false
    traverse(asyncRouter, item => {
      return permissionInfo.some(e => {
        return e === item.path
      })
    })

    // 遍历异步路由列表，符合权限信息的路由节点保留，不符合的删除
    function traverse (routerArr, func) {
      if (Object.prototype.toString.call(routerArr) !== '[object Array]')
        return false
      if (typeof func !== 'function') return false
      for (let i = routerArr.length - 1; i >= 0; i--) {
        let e = routerArr[i]
        if (func(e)) {
          // 为匹配的异步路由节点对象添加meta属性，为了页面按钮权限控制
          e.meta.permission = permissionInfo
        } else {
          routerArr.splice(i, 1)
        }
        if (e.children && e.children.length) {
          traverse(e.children, func)
        }
      }
    }
  }
}
