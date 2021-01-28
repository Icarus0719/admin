// 异步路由，超管权限页面
export const asyncSuperAdminMap = [{
  path: '/index',
  component: () => import('@/views/Index.vue'),
  meta: {},
  // redirect: "/board",
  children: []
}, {
  path: '/404',
  name: "404",
  meta: {},
  component: () => import('@/components/404.vue'),
}, ];


// 根据当前业务临时配置部分权限信息
function _tempSetPermissionInfo(permissionInfo) {
  // 一些额外的新增编辑页面是和列表页相关联的，后台并未做权限表配置
  const tempPath = ['/lease/apply', '/lease/delete', '/lease/yearapply', '/leader/case', '/manager/case', '/affair/all', '/affair/fail', '/affair/delete', '/affair/finished', '/account', '/notice', "/financial"]
  let newArr = JSON.parse(JSON.stringify(permissionInfo))
  tempPath.forEach(e => {
    if (newArr.includes(e)) {
      let addPermission = []
      switch (e) {
        case "/lease/apply":
          addPermission = ['/apply/add', '/apply/edit', '/apply/info', '/apply/message']
          break;
        case "/lease/delete":
        case "/lease/yearapply":
        case "/leader/case":
        case "/manager/case":
        case "/affair/fail":
        case "/affair/delete":
        case "/affair/finished":
          addPermission = ['/apply/info', '/apply/message']
          break;
        case "/affair/all":
          addPermission = ['/apply/affairEdit', '/apply/info', '/apply/review', '/apply/margin', '/apply/message']
          break;
        case "/account":
          addPermission = ['/account/add', '/account/edit']
          break;
        case "/notice":
          addPermission = ['/notice/add', '/notice/edit']
          break;
        case "/financial":
          addPermission = ['/apply/updatePay', '/apply/info']
          break;
      }
      newArr = newArr.concat(addPermission)
    }
  })
  newArr = newArr.concat(["/userInfo"])
  return newArr
}

/**
 * 根据登录返回的权限列表获取匹配的路由对象，并设置meta属性
 * 此处需要根据后台权限树的数据结构进行修正
 * 当前后台返回的权限列表结构是[{children:[],node:{url,name}},...]
 * @param {array} asyncRouter 异步路由列表
 * @param {array} permission 权限列表
 */
export const routerMatch = (asyncRouter, permission) => {
  let permissionInfo = getPermissionInfo(permission);
  permissionInfo = _tempSetPermissionInfo(permissionInfo);
  setNewAsyncRouters([asyncRouter[0]], permissionInfo);
  // 新路由表的根节点需要重新设置redirect属性
  asyncRouter[0].redirect = asyncRouter[0].children.length ? asyncRouter[0].children[0].path : "/404"
  return asyncRouter

  // 获取权限页面信息
  function getPermissionInfo(permission, newArr = []) {
    permission.forEach(e => {
      // ps:根据后台字段进行设置
      newArr.push(e.node.url);
      if (e.children && e.children.length) {
        getPermissionInfo(e.children, newArr)
      }
    })
    return newArr
  }

  // 根据权限信息中的权限路径，重新设置异步路由表
  function setNewAsyncRouters(asyncRouter, permissionInfo) {
    if (Object.prototype.toString.call(asyncRouter) !== "[object Array]") return false
    if (Object.prototype.toString.call(permissionInfo) !== "[object Array]") return false
    traverse(asyncRouter, item => {
      return permissionInfo.some(e => {
        return e === item.path
      })
    })

    // 遍历异步路由列表，符合权限信息的路由节点保留，不符合的删除
    function traverse(routerArr, func) {
      if (Object.prototype.toString.call(routerArr) !== "[object Array]") return false
      if (typeof func !== "function") return false
      for (let i = routerArr.length - 1; i >= 0; i--) {
        let e = routerArr[i];
        if (func(e)) {
          // 为匹配的异步路由节点对象添加meta属性，为了页面按钮权限控制
          e.meta.permission = permissionInfo;
        } else {
          routerArr.splice(i, 1)
        }
        if (e.children && e.children.length) {
          traverse(e.children, func);
        }
      }
    }
  }
}