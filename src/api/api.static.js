import {
  axiosGet
} from './axios';
import * as codeMessage from './codeMessage';
import baseUrl from './baseUrl';
const preUrl = baseUrl.url + "/order";
/**
 * @method getOrderDayStatistics 订单当日销售统计
 */
export const getOrderDayStatistics = data => {
  const httpConfig = {
    url: `${preUrl}/getOrderDayStatistics`,
    config: {
      params: data,
      loading: false,
    }
  };
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}
/**
 * @method getOrderNumStatisticsByMonth 所在年度每个月份销售数量统计
 */
export const getOrderNumStatisticsByMonth = data => {
  const httpConfig = {
    url: `${preUrl}/getOrderNumStatisticsByMonth`,
    config: {
      params: data,
      loading: false,
    }
  };
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}
/**
 * @method getOrderAmountStatisticsByMonth 所在年度每个月份销售金额统计
 */
export const getOrderAmountStatisticsByMonth = data => {
  const httpConfig = {
    url: `${preUrl}/getOrderAmountStatisticsByMonth`,
    config: {
      params: data,
      loading: false,
    }
  };
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}
/**
 * @method getOrderNumStatisticsByQuarter 所在年度每个季度销售数量统计
 */
export const getOrderNumStatisticsByQuarter = data => {
  const httpConfig = {
    url: `${preUrl}/getOrderNumStatisticsByQuarter`,
    config: {
      params: data,
      loading: false,
    }
  };
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}
/**
 * @method getOrderAmountStatisticsByQuarter 所在年度每个季度销售金额统计
 */
export const getOrderAmountStatisticsByQuarter = data => {
  const httpConfig = {
    url: `${preUrl}/getOrderAmountStatisticsByQuarter`,
    config: {
      params: data,
      loading: false,
    }
  };
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}