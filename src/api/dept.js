import {
  axiosPost,
  axiosDelete,
  axiosPut,
  axiosGet
} from './axios';
import * as codeMessage from './codeMessage';
import baseUrl from './baseUrl';
const preUrl = baseUrl.url;
/**
 * @method addDepartment   新建部门
 * @param {*} data 
 */
export const addDepartment = data => {
  const httpConfig = {
    url: `${preUrl}/dept`,
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
 * @method getDepartment 获取部门树
 */
export const getDepartment = () => {
  const httpConfig = {
    url: `${preUrl}/dept`,
    config: {
      loading: true,
    }
  };
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}
/**
 * @method deleteDepartment  删除部门
 */
export const deleteDepartment = data => {
  const httpConfig = {
    url: `${preUrl}/dept/${data.id}`,
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
 * @method updateDepartment  更新部门
 * @param {*} data 
 */
export const updateDepartment = data => {
  const httpConfig = {
    url: `${preUrl}/dept`,
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