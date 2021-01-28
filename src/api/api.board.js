import {
  axiosGet
} from './axios';
import * as codeMessage from './codeMessage';
import baseUrl from './baseUrl';
const preUrl = baseUrl.url + "/displayBoard";

/**
 * @method getBoardNotice 获取公告通知
 */
export const getBoardNotice = () => {
  const httpConfig = {
    url: `${preUrl}/getNotice`,
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
 * @method getPersonalOrderCurrMonthRank 个人订单月度排行数据
 */
export const getPersonalOrderCurrMonthRank = data => {
  const httpConfig = {
    url: `${preUrl}/getPersonalOrderCurrMonthRank`,
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
 * @method getPersonalOrderCurrYearRank 个人订单年度排行数据
 */
export const getPersonalOrderCurrYearRank = data => {
  const httpConfig = {
    url: `${preUrl}/getPersonalOrderCurrYearRank`,
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
 * @method getDeptOrderRank 所有部门订单排行数据
 */
export const getDeptOrderRank = data => {
  const httpConfig = {
    url: `${preUrl}/getDeptOrderRank`,
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
 * @method getOrderApplyAmountRankList 所有部门个人订单申请金额月度排行
 */
export const getOrderApplyAmountRankList = data => {
  const httpConfig = {
    url: `${preUrl}/getOrderApplyAmountRankList`,
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
 * @method getDeptFile 获取社内文件
 */
export const getDeptFile = () => {
  const httpConfig = {
    url: `${preUrl}/getDeptFile`,
    config: {
      loading: true,
    }
  };
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}