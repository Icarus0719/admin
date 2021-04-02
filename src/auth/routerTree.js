// 侧边栏，面包屑等路由内容的树形数据结构
import i18n from '@/lang';

function AdminPath() {
  this.data = [
    {
      title: '弹窗组件',
      path: '/home',
      icon: 'el-icon-notebook-1',
      children: [],
    },
    {
      title: '用户管理',
      path: '/user',
      icon: 'el-icon-money',
      children: [],
    },
    {
      title: '角色管理',
      path: '/role',
      icon: 'el-icon-office-building',
      children: [],
    },
    {
      title: i18n.t('Aside.SysCenter'),
      path: '/system',
      icon: 'el-icon-user',
      children: [],
    },
  ];
}
export const superAdminPathList = new AdminPath().data;

export const changeLang = () => {
  return new AdminPath().data;
};
