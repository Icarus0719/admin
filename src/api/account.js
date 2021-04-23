import { axiosGet, axiosPost } from './axios'
import * as codeMessage from './codeMessage'
import baseUrl from './baseUrl'
const preUrl = baseUrl.url
/**
 * @method getImageCode 获取图片验证码
 * @param {*} data
 */
export const getImageCode = data => {
  const httpConfig = {
    url: `${preUrl}/getImageCode/${data.imageWidth}/${data.imageHeight}/${data.imageId}`,
    config: {
      responseType: 'blob',
      loading: false
    }
  }
  return axiosGet(httpConfig.url, httpConfig.config)
}
/**
 * @method sendSmsCode 发送短信验证码--注册用
 * @param {*} data
 */
export const sendSmsCode = data => {
  const httpConfig = {
    url: `${preUrl}/sendSmsCode`,
    config: {
      params: data,
      loading: false
    }
  }
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res, {
      errorText: '获取失败！'
    })
    if (codeMessage.isResponseSuccess(res)) return res
  })
}
/**
 * @method sendSmsCodeInLogin 发送短信验证码--登录用
 * @param {*} data
 */
export const sendSmsCodeInLogin = data => {
  const httpConfig = {
    url: `${preUrl}/appUserSendSmsCode`,
    config: {
      params: data,
      loading: false
    }
  }
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res, {
      errorText: '获取失败！',
      successText: '验证码已发送，请注意查收！'
    })
    if (codeMessage.isResponseSuccess(res)) return res
  })
}
/**
 * @method submitLogin //提交登录
 * @param {*} data
 */
export const submitLogin = data => {
  const httpConfig = {
    url: `${preUrl}/login`,
    data: data,
    config: {
      loading: false
    }
  }
  return axiosPost(httpConfig.url, httpConfig.data, httpConfig.config).then(
    res => {
      codeMessage.dealAPIResponse(res, {
        errorText: '登录失败！'
      })
      if (codeMessage.isResponseSuccess(res)) return res
    }
  )
}
/**
 * @method submitRegister //提交注册
 * @param {*} data
 */
export const submitRegister = data => {
  const httpConfig = {
    url: `${preUrl}/user/register`,
    data: data,
    config: {
      loading: false
    }
  }
  return axiosPost(httpConfig.url, httpConfig.data, httpConfig.config).then(
    res => {
      codeMessage.dealAPIResponse(res, {
        errorText: '注册失败！'
      })
      if (codeMessage.isResponseSuccess(res)) return res
    }
  )
}
/**
 * @method updatePassword //忘记密码
 * @param {*} data
 */
export const updatePassword = data => {
  const httpConfig = {
    url: `${preUrl}/user/updatePwd`,
    data: data,
    config: {
      loading: false
    }
  }
  return axiosPost(httpConfig.url, httpConfig.data, httpConfig.config).then(
    res => {
      codeMessage.dealAPIResponse(res, {
        errorText: '密码设置失败！'
      })
      if (codeMessage.isResponseSuccess(res)) return res
    }
  )
}
/**
 * @method logout 退出登录
 * @param {*} data
 */
export const logout = () => {
  const httpConfig = {
    url: `${preUrl}/logout`,
    config: {
      loading: false
    }
  }
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res, {
      errorText: '退出失败！'
    })
    if (codeMessage.isResponseSuccess(res)) return res
  })
}
