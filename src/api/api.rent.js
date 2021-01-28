import {
  axiosPost,
  axiosGet,
  axiosDelete
} from './axios';
import * as codeMessage from './codeMessage';
import baseUrl from './baseUrl';
const preUrl = baseUrl.url + "/order";
/**
 * @method createRentOrder 创建租房合同
 * @param {*} data 
 */
export const createRentOrder = data => {
  const httpConfig = {
    url: `${preUrl}/createRentOrder`,
    data: data,
    config: {
      loading: true,
    }
  };
  return axiosPost(httpConfig.url, httpConfig.data, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}
/**
 * @method updateRentOrder 更新订单接口
 * @param {*} data 
 */
export const updateRentOrder = data => {
  const httpConfig = {
    url: `${preUrl}/updateRentOrder`,
    data: data,
    config: {
      loading: true,
    }
  };
  return axiosPost(httpConfig.url, httpConfig.data, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}
/**
 * @method queryRentOrderPage 查询订单列表分页
 */
export const queryRentOrderPage = (data) => {
  const httpConfig = {
    url: `${preUrl}/queryRentOrderPage`,
    config: {
      loading: true,
      params: data,
    }
  };
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}
/**
 * @method queryRentOrderDetail 查询订单明细
 * @param {*} data 
 */
export const queryRentOrderDetail = data => {
  const httpConfig = {
    url: `${preUrl}/queryRentOrderDetail`,
    config: {
      loading: true,
      params: data,
    }
  };
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}
/**
 * @method addLeaveMessage 添加留言
 * @param {*} data 
 */
export const addLeaveMessage = data => {
  const httpConfig = {
    url: `${preUrl}/leave`,
    data: data,
    config: {
      loading: true,
    }
  };
  return axiosPost(httpConfig.url, httpConfig.data, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}
/**
 * @method queryOrderMonth 按月分组查询
 * @param {*} data 
 */
export const queryOrderMonth = data => {
  const httpConfig = {
    url: `${preUrl}/dept/info`,
    config: {
      loading: true,
      params: data
    }
  };
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}
/**
 * @method deleteOrder 删除订单接口
 */
export const deleteOrder = data => {
  const httpConfig = {
    url: `${preUrl}/delete`,
    config: {
      loading: false,
      params: data
    }
  };
  return axiosDelete(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res, {
      successText: "Success!",
    });
    if (res.code === 200) return res;
  });
}
/**
 * @method recoverOrder 恢复订单
 */
export const recoverOrder = data => {
  const httpConfig = {
    url: `${preUrl}/recover`,
    config: {
      loading: false,
      params: data
    }
  };
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}
/**
 * @method updateApplyState 订单状态流转
 */
export const updateApplyState = data => {
  const httpConfig = {
    url: `${preUrl}/update/status`,
    config: {
      loading: true,
      params: data
    }
  };
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}
/**
 * @method updateMessageState 已读留言接口
 * @param {*} data 
 */
export const updateMessageState = data => {
  const httpConfig = {
    url: `${preUrl}/update/isRead`,
    data: data,
    config: {
      loading: true,
      params: data
    }
  };
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res,{
      successText:"Success!"
    });
    if (res.code === 200) return res;
  });
}
/**
 * @method addNewMessage 新建留言
 * @param {*} data 
 */
export const addNewMessage = data => {
  const httpConfig = {
    url: `${preUrl}/leave`,
    data: data,
    config: {
      loading: true,
    }
  };
  return axiosPost(httpConfig.url, httpConfig.data, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}
/**
 * @method getCompanyInfo 获取公司信息
 */
export const getCompanyInfo = (data) => {
  const httpConfig = {
    url: `${preUrl}/getCompanyInfo`,
    config: {
      loading: false,
      params: data,
    }
  };
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}