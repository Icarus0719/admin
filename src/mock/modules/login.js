import Mock from 'mockjs';

// 登录
export function login() {
  return {
    isOpen: true,
    url: '/sys/login',
    type: 'post',
    data: {
      msg: 'success',
      resultCode: 200,
      expire: Mock.Random.natural(60 * 60 * 1, 60 * 60 * 12),
      token: Mock.Random.string('abcdefghijklmnopqrstuvwxyz0123456789', 32),
    },
  };
}
// 获取图片验证码
export function list() {
  return {
    isOpen: true,
    url: '/sys/imagecode',
    type: 'get',
    data: {
      msg: 'success',
      resultCode: 200,
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
