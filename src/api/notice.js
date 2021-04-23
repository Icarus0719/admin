import {
  axiosPost,
  axiosDelete,
  axiosPut,
  axiosGet
} from './axios';
import * as codeMessage from './codeMessage';
import baseUrl from './baseUrl';
const preUrl = baseUrl.url + "/notice";
/**
 * @method getNoticeList 通知列表查询
 */
export const getNoticeList = data => {
  const httpConfig = {
    url: `${preUrl}`,
    config: {
      params: data,
      loading: true,
    }
  };
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}
/**
 * @method getNoticeItem 查询单个通知
 */
export const getNoticeItem = data => {
  const httpConfig = {
    url: `${preUrl}/${data.id}`,
    config: {
      loading: false,
    }
  };
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}
/**
 * @method addNotice  新增通知
 * @param {*} data 
 */
export const addNotice = data => {
  const httpConfig = {
    url: `${preUrl}`,
    data: data,
    config: {
      loading: false,
    }
  };
  return axiosPost(httpConfig.url, httpConfig.data, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}
/**
 * @method batchDeleteNotice  批量删除
 */
export const batchDeleteNotice = data => {
  const httpConfig = {
    url: `${preUrl}/batchDelete`,
    config: {
      params: data,
      loading: false
    }
  };
  return axiosDelete(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}
/**
 * @method deleteNoticeItem  删除单个通知
 */
export const deleteNoticeItem = data => {
  const httpConfig = {
    url: `${preUrl}/${data.id}`,
    config: {
      loading: false
    }
  };
  return axiosDelete(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}
/**
 * @method updateNotice  修改通知
 * @param {*} data 
 */
export const updateNotice = data => {
  const httpConfig = {
    url: `${preUrl}`,
    data: data,
    config: {
      loading: false,
    }
  };
  return axiosPut(httpConfig.url, httpConfig.data, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}