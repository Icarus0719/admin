import { axiosPost, axiosDelete, axiosPut, axiosGet } from './axios'
import * as codeMessage from './codeMessage'
import baseUrl from './baseUrl'
const preUrl = baseUrl.url + '/user'
/**
 * @method addUser   新增用户
 * @param {*} data
 */
export const addUser = data => {
  const httpConfig = {
    url: `${preUrl}`,
    data: data,
    config: {
      loading: false
    }
  }
  return axiosPost(httpConfig.url, httpConfig.data, httpConfig.config).then(
    res => {
      codeMessage.dealAPIResponse(res)
      if (res.code === 200) return res
    }
  )
}
/**
 * @method getUserList 获取用户列表
 */
export const getUserList = data => {
  const httpConfig = {
    url: `${preUrl}`,
    config: {
      loading: true,
      params: data
    }
  }
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res)
    if (res.code === 200) return res
  })
}
/**
 * @method getAllUser 获取用户列表---不分页
 */
export const getAllUser = data => {
  const httpConfig = {
    url: `${preUrl}/list`,
    config: {
      loading: false,
      params: data
    }
  }
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res)
    if (res.code === 200) return res
  })
}
/**
 * @method getUserInfo 获取用户信息
 */
export const getUserInfo = data => {
  const httpConfig = {
    url: `${preUrl}/${data.id}`,
    config: {
      loading: false
    }
  }
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res)
    if (res.code === 200) return res
  })
}
/**
 * @method deleteUser  删除用户
 */
export const deleteUser = data => {
  const httpConfig = {
    url: `${preUrl}/${data.id}`,
    config: {
      loading: false
    }
  }
  return axiosDelete(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res)
    if (res.code === 200) return res
  })
}
/**
 * @method updateUser  更新用户
 * @param {*} data
 */
export const updateUser = data => {
  const httpConfig = {
    url: `${preUrl}`,
    data: data,
    config: {
      loading: false
    }
  }
  return axiosPut(httpConfig.url, httpConfig.data, httpConfig.config).then(
    res => {
      codeMessage.dealAPIResponse(res, {
        successText: 'Success!'
      })
      if (res.code === 200) return res
    }
  )
}
/**
 * @method resetUserPwd   重置用户密码
 * @param {*} data
 */
export const resetUserPwd = data => {
  const httpConfig = {
    url: `${preUrl}/reset/${data.id}`,
    data: null,
    config: {
      loading: false
    }
  }
  return axiosPost(httpConfig.url, httpConfig.data, httpConfig.config).then(
    res => {
      codeMessage.dealAPIResponse(res, {
        successText: 'Success!'
      })
      if (res.code === 200) return res
    }
  )
}
