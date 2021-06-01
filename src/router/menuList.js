// 侧边栏，面包屑等路由页面的树形数据结构
function getMenuList() {
  this.data = [{
      title: '首页',
      url: '/home',
      children: [],
    },
    {
      title: '角色',
      url: '/role',
      children: [],
    },
    {
      title: '用户',
      url: '/user',
      children: [],
    },
  ];

}
export const menuList = new getMenuList().data