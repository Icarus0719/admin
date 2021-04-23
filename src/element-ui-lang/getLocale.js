// 国际版字段数据池
const dataList = {
  Login: {
    button: ['登录', '登 録'],
  },
};

function getLocale(data, index = 0, newObj = {}) {
  for (let key in data) {
    if (Object.prototype.toString.call(data[key]) === '[object Array]') {
      newObj[key] = data[key][index];
    }
    if (Object.prototype.toString.call(data[key]) === '[object Object]') {
      newObj[key] = {};
      getLocale(data[key], index, newObj[key]);
    }
  }
  return newObj;
}
export default (index) => {
  return getLocale(dataList, index);
};
