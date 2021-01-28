import axios from 'axios';
import {
  Loading
} from 'element-ui';
import UserInfo from '@/assets/js/userInfo.js';
import * as codeMessage from './codeMessage';

const user = new UserInfo();
let loadingInstance = null;

function showLoading() {
  loadingInstance = Loading.service({
    fullscreen: true,
    text: "Loading",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
}

function closeLoading() {
  if (loadingInstance) loadingInstance.close()
}

// 超时时间
const timeout = 60000;
// axios实例
const axiosInstance = axios.create({
  timeout: timeout
})
// 请求拦截器
axiosInstance.interceptors.request.use(config => {
  if (config.loading) showLoading()
  config.headers = {
    "token": user.getInfo().token ? user.getInfo().token : ''
  }
  return config;
}, error => {
  if (error.config.loading) closeLoading();
  return Promise.reject(error);
});
// 响应拦截器
axiosInstance.interceptors.response.use(response => {
  if (response.config.loading) closeLoading();
  if (response.data.code === 2001) {
    codeMessage.dealAPIError(response.data);
    user.exitLogin();
  }
  return response.data;
}, error => {
  if (error.config.loading) closeLoading();
  codeMessage.dealServerError(error.response)
});

// get请求
export const axiosGet = (url, config) => {
  return new Promise((resolve, reject) => {
    axiosInstance.get(
        url,
        config
      )
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error)
      })
  })
}
// post请求
export const axiosPost = (url, data, config) => {
  return new Promise((resolve, reject) => {
    axiosInstance.post(
        url,
        data,
        config
      )
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error)
      })
  })
}
// put请求
export const axiosPut = (url, data, config) => {
  return new Promise((resolve, reject) => {
    axiosInstance.put(
        url,
        data,
        config
      )
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error)
      })
  })
}
// delete请求
export const axiosDelete = (url, config) => {
  return new Promise((resolve, reject) => {
    axiosInstance.delete(
        url,
        config
      )
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error)
      })
  })
}