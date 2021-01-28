import {
  axiosPost,
  axiosGet,
  axiosDelete,
  axiosPut,
} from './axios';
import * as codeMessage from './codeMessage';
import baseUrl from './baseUrl';
const preUrl = baseUrl.url + "/role";
/**
 * @method saveRolePriv 保存角色权限
 * @param {*} data 
 */
export const saveRolePriv = data => {
  const httpConfig = {
    url: `${preUrl}/priv`,
    data: data,
    config: {
      loading: true,
    }
  };
  return axiosPost(httpConfig.url, httpConfig.data, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res, {
      successText: "Save Success!"
    });
    if (res.code === 200) return res;
  });
}
/**
 * @method addRole 新增角色
 * @param {*} data 
 */
export const addRole = data => {
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
 * @method updateRole 编辑角色
 * @param {*} data 
 */
export const updateRole = data => {
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
/**
 * @method deleteRole  删除角色
 */
export const deleteRole = data => {
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
 * @method getRoleList 获取角色列表
 */
export const getRoleList = () => {
  const httpConfig = {
    url: `${preUrl}`,
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
 * @method getRolePriv 获取角色权限
 */
export const getRolePriv = (data, loading = true) => {
  const httpConfig = {
    url: `${preUrl}/priv`,
    config: {
      params: data,
      loading: loading,
    }
  };
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}