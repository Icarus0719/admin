import * as validate from './validate'
// import i18n from '@/lang'

function createRules () {
  this.rules = {
    account: [
      {
        required: true,
        message: '请输入用户名称',
        trigger: 'change'
      },
      {
        pattern: validate.account.reg,
        message: validate.account.message
      }
    ],
    companyName: [
      {
        required: true,
        message: '请输入公司名称',
        trigger: 'change'
      },
      {
        pattern: validate.companyName.reg,
        message: validate.companyName.message
      }
    ],
    phone: [
      {
        required: true,
        message: '请输入手机号码',
        trigger: 'change'
      },
      {
        pattern: validate.phone.reg,
        message: validate.phone.message
      }
    ],
    imageCode: [
      {
        required: true,
        message: '请输入图形验证码',
        trigger: 'change'
      },
      {
        pattern: validate.imageCode.reg,
        message: validate.imageCode.message
      }
    ],
    verifCode: [
      {
        required: true,
        message: '请输入短信验证码',
        trigger: 'change'
      },
      {
        pattern: validate.verifCode.reg,
        message: validate.verifCode.message
      }
    ],
    password: [
      {
        required: true,
        message: '请输入登录密码',
        trigger: 'change'
      },
      {
        pattern: validate.password.reg,
        message: validate.password.message
      }
    ],
    roomName: [
      {
        required: true,
        message: '请输入直播房间名称',
        trigger: 'change'
      },
      {
        pattern: validate.titleName.reg,
        message: validate.titleName.message
      }
    ],
    theme: [
      {
        required: true,
        message: '请输入直播主题',
        trigger: 'change'
      },
      {
        pattern: validate.titleName.reg,
        message: validate.titleName.message
      }
    ],
    startTime: [
      {
        required: true,
        message: '请选择直播开始时间',
        trigger: 'blur'
      }
    ],
    deviceName: [
      {
        required: true,
        message: '请输入机位名称',
        trigger: 'change'
      },
      {
        pattern: validate.deviceName.reg,
        message: validate.deviceName.message
      }
    ],
    deviceType: [
      {
        required: true,
        message: '请选择设备类型',
        trigger: 'blur'
      }
    ],
    marketList_name: [
      {
        required: false,
        message: '请输入商品名称',
        trigger: 'change'
      },
      {
        pattern: validate.shopName.reg,
        message: validate.shopName.message
      }
    ],
    marketList_url: [
      {
        required: false,
        message: '请输入商品链接',
        trigger: 'change'
      },
      {
        pattern: validate.webUrl.reg,
        message: validate.webUrl.message
      }
    ]
  }
}
export const FormRules = new createRules().rules

export const changeLang = () => {
  return new createRules().rules
}
