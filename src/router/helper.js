export const _import = (file) => {
  return () => import('@/views/' + file + '.vue');
};

/**
 *获取动态权限路由对象
 * @param {*} menuList 后台返回的权限列表树
 */
export const addAsyncRoutes = (menuList) => {
  const menuPaths = getMenuPathList(menuList);
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
            permission: menuPaths, // meta属性--控制页面dom元素显隐，结合自定义指令
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
  // 获取动态路由的url数组
  function getMenuPathList(menuList, newArr = []) {
    menuList.forEach((e) => {
      // ps:根据后台字段进行设置
      let url = e.url;
      if (url) {
        newArr.push(url);
      }
      if (e.children && e.children.length) {
        getMenuPathList(e.children, newArr);
      }
    });
    return newArr;
  }
};
