import {
  Message
} from 'element-ui';
// 提示函数
const TipFunc = (msg, type = "error") => {
  Message({
    type: type,
    message: msg,
  });
}
// 错误码
const errorCode = {
  server: {
    404: "请求资源不存在！",
    500: "服务器内部异常！",
    504: "网关超时，请稍后重试！",
  },
  api: {
    11000: "账号已失效，请重新登录",
  },
}
// 服务器报错
export const dealServerError = (response) => {
  if (response && response.status === 200) return false;
  let errMsg = "";
  if (response) {
    errMsg = `${errorCode.server[response.status]||"服务器异常，请稍后重试！"}`;
  } else {
    errMsg = "请求资源超时！";
  }
  TipFunc(errMsg);
}
// 接口报错
export const dealAPIError = (response, msgText = "") => {
  let errMsg = `${errorCode.api[response.code] || (msgText+response.message)||"未知错误"}`;
  TipFunc(errMsg);
}
// 接口成功
export const dealAPISuccess = (msgText) => {
  msgText && TipFunc(msgText, "success");
}
// 接口信息
export const dealAPIResponse = (response, option = {
  successText: "",
  errorText: ""
}) => {
  if (!response) return false;
  if (response.code === 200) {
    dealAPISuccess(option.successText)
  } else {
    dealAPIError(response, option.errorText)
  }
}