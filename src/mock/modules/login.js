import Mock from 'mockjs';

// 登录
export function login() {
  return {
    isOpen: true,
    url: '/login',
    type: 'post',
    data: {
      msg: 'success',
      resultCode: 200,
      data: {
        token: Mock.Random.string('abcdefghijklmnopqrstuvwxyz0123456789', 32),
        account: 'admin',
      },
    },
  };
}
// 退出
export function logout() {
  return {
    isOpen: true,
    url: '/sys/logout',
    type: 'post',
    data: {
      msg: 'success',
      resultCode: 200,
    },
  };
}
