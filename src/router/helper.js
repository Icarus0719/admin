export const _import = (file) => {
  return () => import('@/views/' + file + '.vue');
};

/**
 *添加动态权限路由对象
 * @param {*} menuList 后台返回的权限列表树
 * @param {*} permissionList 操作权限列表
 */
export const addAsyncRoutes = (menuList, permissionList = []) => {
  const newRoutes = addAsyncRoutesFunc(menuList);
  return newRoutes;
  // 获取动态路由对象
  function addAsyncRoutesFunc(menuList, routes = []) {
    let temp = [];
    menuList.forEach((menu) => {
      if (menu.children && menu.children.length) {
        temp = temp.concat(menu.children);
      }
      let url = menu.url;
      if (url) {
        url = url.replace(/^\//, '');
        let route = {
          path: '/' + url.replace('/', '-'),
          name: url.replace('/', '-'),
          component: _import(`modules/${url}`) || null, // 默认页面组件的目录
          meta: {
            permission: permissionList, // 可结合自定义指令，完成显隐页面操作按钮
          },
        };
        routes.push(route);
      }
    });
    if (temp.length) {
      addAsyncRoutesFunc(temp, routes);
    }
    return routes;
  }
};

export const hasCurrentRoute = (route, globalRoutes) => {
  var temp = [];
  for (var i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return true;
    } else if (
      globalRoutes[i].children &&
      globalRoutes[i].children.length >= 1
    ) {
      temp = temp.concat(globalRoutes[i].children);
    }
  }
  return temp.length >= 1 ? hasCurrentRoute(route, temp) : false;

}