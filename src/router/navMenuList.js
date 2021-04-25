// 侧边栏，面包屑等路由页面的树形数据结构
function getMenuList() {
  this.data = [
    {
      title: '首页',
      url: '/home',
      icon: 'el-icon-notebook-1',
      children: [],
    },
    {
      title: '用户管理',
      url: '/user',
      icon: 'el-icon-money',
      children: [],
    },
    {
      title: '角色管理',
      url: '/role',
      icon: 'el-icon-office-building',
      children: [],
    },
  ];
}
export const menuList = new getMenuList().data;
