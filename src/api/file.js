import { axiosPost, axiosDelete, axiosGet } from './axios'
import * as codeMessage from './codeMessage'
import baseUrl from './baseUrl'
const preUrl = baseUrl.url + '/file'

/**
 * @method uploadFile 上传文件
 * @param {*} data
 */
export const uploadFile = data => {
  const httpConfig = {
    url: `${preUrl}/upload`,
    data: data,
    config: {
      loading: true
    }
  }
  return axiosPost(httpConfig.url, httpConfig.data, httpConfig.config).then(
    res => {
      codeMessage.dealAPIResponse(res, {
        successText: 'Success!'
      })
      return res
    }
  )
}
/**
 * @method deleteFile //文件删除
 */
export const deleteFile = data => {
  const httpConfig = {
    url: `${preUrl}/delete/${data.id}`,
    config: {
      loading: false
    }
  }
  return axiosDelete(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res)
    if (codeMessage.isResponseSuccess(res)) return res
  })
}
/**
 * @method getCompanyFiles 社内资料列表查询
 */
export const getCompanyFiles = data => {
  const httpConfig = {
    url: `${preUrl}`,
    config: {
      loading: true,
      params: data
    }
  }
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res)
    if (codeMessage.isResponseSuccess(res)) return res
  })
}
/**
 * @method getFileByData 根据条件获取单个资料
 */
export const getFileByData = data => {
  const httpConfig = {
    url: `${preUrl}/getFile`,
    config: {
      loading: true,
      params: data
    }
  }
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res)
    if (codeMessage.isResponseSuccess(res)) return res
  })
}
/**
 * @method getOrderNoList  获取订单编号列表
 */
export const getOrderNoList = data => {
  const httpConfig = {
    url: `${preUrl}/getOrderNoList`,
    config: {
      loading: true,
      params: data
    }
  }
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res)
    if (codeMessage.isResponseSuccess(res)) return res
  })
}
/**
 * @method getOrderFileList  获取订单资料并按文件类型分组
 */
export const getOrderFileList = data => {
  const httpConfig = {
    url: `${preUrl}/getOrderFileList`,
    config: {
      loading: true,
      params: data
    }
  }
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res)
    if (codeMessage.isResponseSuccess(res)) return res
  })
}
