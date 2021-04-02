//图片验证码
export const imageCode = {
  reg: /^[a-zA-Z0-9]{4}$/,
  message: '验证码格式不正确'
}
export const account = {
  reg: /^[a-z][a-z0-9_]{7,15}$/,
  message: '以小写字母开头，由8-16位小写字母、数字、下划线组成'
}
export const password = {
  reg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/,
  message: '密码为8~16位字符，必须同时包含大小写字母和数字'
}
export const phone = {
  reg: /^(1[3-9][0-9])\d{8}$/,
  message: '手机号码格式不正确'
}
export const telephone = {
  reg: /^((0\d{2,3}-\d{7,8})|(1[3-9][0-9]\d{8}))$/,
  message: '号码格式不正确'
}
export const verifCode = {
  reg: /^\d{4,6}$/,
  message: '验证码格式不正确'
}
export const email = {
  reg: /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/,
  message: '邮箱格式不对'
}
export const IDCard = {
  reg: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
  message: '中国居民身份证不合规'
}
export const passport = {
  reg: /^([E|K]\d{8}|[S|D|P][E]\d{7}|[M][A]\d{7})$/,
  message: '护照不合规'
}
export const residenceID = {
  reg: /^[A-Za-z0-9]{15}$/,
  message: '外国人永久居留身份证不合规'
}
export const creditCode = {
  reg: /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/,
  message: '社会信用代码不合规'
}
export const webUrl = {
  reg: /^(?=^.{3,255}$)(http(s)?:\/\/)\w+[^\s][a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)?(\/[^\s]+)*$/,
  message: '网站地址格式不正确'
}
export const imeiCode = {
  reg: /^\d{15}$/,
  message: 'IMEI号必须为15位数字'
}
export const remarkEmoticon = (rule, value, callback) => {
  if (
    value &&
    value.search(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g) !== -1
  ) {
    callback(new Error('不能输入表情符号'))
  } else {
    callback()
  }
}
export const address = {
  reg: /^[a-zA-Z0-9-_.\u4e00-\u9fa5]{0,50}$/,
  message: '地址长度小于等于50，中英文数字-_.'
}
// 正整数规则
export const chargeNum = {
  reg: /(^[1-9]([0-9]+)?$)|(^([0-9])$)/,
  message: 'Validation error'
}
export const money = {
  reg: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
  message: "格式不正确"
}
export const area = {
  reg: /(^[1-9]([0-9]+)?(\.[0-9]+)?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
  message: "格式不正确"
}

export const personName = {
  reg: /^([a-zA-Z]|[\u4e00-\u9fa5]){1,10}$/,
  message: '名称为中英文1-10个字符'
}
export const title = {
  reg: /^([a-zA-Z]|[\u4e00-\u9fa5]){1,50}$/,
  message: '标题为中英文1-50个字符'
}
export const companyName = {
  reg: /^([a-zA-Z0-9]|[\u4e00-\u9fa5]){1,50}$/,
  message: '公司名称为中英文或数字，1-50个字符'
}

export const deviceName = {
  reg: /^([a-zA-Z0-9\u4e00-\u9fa5]){1,25}$/,
  message: '名称为中英文或数字，1-25个字符'
}
export const shopName = {
  reg: /^([a-zA-Z0-9\u4e00-\u9fa5]){1,25}$/,
  message: '1-25位中英文或数字'
}
export const titleName = {
  reg: /^([a-zA-Z0-9\u4e00-\u9fa5]){1,25}$/,
  message: '名称为中英文或数字，1-25个字符'
}
