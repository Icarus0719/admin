import * as validate from './validate';

function createRules() {
  this.rules = {
    account: [
      {
        required: true,
        message: '请输入账号',
        trigger: 'change',
      },
      {
        pattern: validate.account.reg,
        message: validate.account.message,
      },
    ],
    phone: [
      {
        required: true,
        message: '请输入手机号码',
        trigger: 'change',
      },
      {
        pattern: validate.phone.reg,
        message: validate.phone.message,
      },
    ],
    imageCode: [
      {
        required: true,
        message: '请输入图形验证码',
        trigger: 'change',
      },
      {
        pattern: validate.imageCode.reg,
        message: validate.imageCode.message,
      },
    ],
    verifCode: [
      {
        required: true,
        message: '请输入短信验证码',
        trigger: 'change',
      },
      {
        pattern: validate.verifCode.reg,
        message: validate.verifCode.message,
      },
    ],
    password: [
      {
        required: true,
        message: '请输入登录密码',
        trigger: 'change',
      },
      {
        pattern: validate.password.reg,
        message: validate.password.message,
      },
    ],
  };
}
export const formRules = new createRules().rules;
