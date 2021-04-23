import {
  axiosGet
} from './axios';
import * as codeMessage from './codeMessage';
import baseUrl from './baseUrl';
const preUrl = baseUrl.url + "/dict";

/**
 * @method qureryDictList 查询字典项数据列表
 */
export const qureryDictList = data => {
  const httpConfig = {
    url: `${preUrl}/${data}`,
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
 * @method qureryDictItem 查询字典项的值
 */
export const qureryDictItem = data => {
  const httpConfig = {
    url: `${preUrl}/${data.type}/${data.key}`,
    config: {
      loading: false,
    }
  };
  return axiosGet(httpConfig.url, httpConfig.config).then(res => {
    codeMessage.dealAPIResponse(res);
    if (res.code === 200) return res;
  });
}