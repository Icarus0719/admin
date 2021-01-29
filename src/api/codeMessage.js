import { Message } from 'element-ui'
// 提示函数
const TipFunc = (msg, type = 'error') => {
  Message({
    type: type,
    message: msg
  })
}
// 错误码合集
const errorCode = {
  server: {
    404: '请求资源不存在！',
    500: '服务器内部异常！',
    504: '网关超时，请稍后重试！'
  },
  api: {
    11000: '账号已失效，请重新登录'
  }
}

// 从api文件中解耦，便于统一配置后台返回code的字段和成功码
export const codeOptions = {
  resultCodeKey: 'resultCode',
  successValue: 200,
  unAuthCode: 11000
}
// 判断账号是否失效
export const isUnAuth = response => {
  if (response[codeOptions.resultCodeKey] === codeOptions.unAuthCode) {
    dealAPIError(response)
    return true
  }
  return false
}
// 判断接口是否成功
export const isResponseSuccess = response => {
  return response[codeOptions.resultCodeKey] === codeOptions.successValue
}
// 服务器报错
export const dealServerError = response => {
  if (response && response.status === 200) return false
  let errMsg = ''
  if (response) {
    errMsg = `${errorCode.server[response.status] ||
      '服务器异常，请稍后重试！'}`
  } else {
    errMsg = '请求资源超时！'
  }
  TipFunc(errMsg)
}
// 接口信息处理
export const dealAPIResponse = (
  response,
  option = {
    successText: '',
    errorText: ''
  }
) => {
  if (!response) return false
  if (isResponseSuccess(response)) {
    dealAPISuccess(option.successText)
  } else {
    dealAPIError(response, option.errorText)
  }
}
// 接口报错处理
export const dealAPIError = (response, msgText = '') => {
  let errMsg = `${errorCode.api[response[codeOptions.resultCodeKey]] ||
    msgText + response.message ||
    '未知错误'}`
  TipFunc(errMsg)
}
// 接口成功处理
export const dealAPISuccess = msgText => {
  msgText && TipFunc(msgText, 'success')
}
