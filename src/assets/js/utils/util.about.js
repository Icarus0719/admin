/**
 * 生成随机数字
 */
export const uuid = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}
/**
 * @method round 小数舍入
 * @param {Number} number 输入数字
 * @param {Number} precision 保留位数
 */
export const round = (number, precision) => {
  return Math.round(+number + 'e' + precision) / Math.pow(10, precision);
}
/**
 * @method getUrlParam 获取url的传参
 */
export const getUrlParam = (hash, key) => {
  let strParams, arrParams, result;
  strParams = hash.split('?')[1];
  arrParams = strParams.split('&');
  for (let item of arrParams) {
    if (item.includes(key)) {
      result = item.split('=')[1];
    } else {
      continue;
    }
  }
  return result;
}
/**
 * @method clearKeyInObject 去掉对象中的空值属性
 */
export const clearKeyInObject = (obj) => {
  for (let key in obj) {
    if (!obj[key] && obj[key] !== 0) {
      delete obj[key]
    }
  }
}
/**
 * @method newSetArrayByKey 数组对象属性去重
 * @param array 数组
 * @param key 属性名,string
 */
export const newSetArrayByKey = (arr, key) => {
  if (Object.prototype.toString.call(arr) !== "[object Array]") return []
  let obj = {};
  let newArr = arr.reduce((item, next) => {
    obj[next[key]] ? "" : (obj[next[key]] = true && item.push(next));
    return item;
  }, []);
  return newArr
}
/**
 * @method groupArrayByKey 数组对象按对象属性分组
 * @param array 数组
 * @param f 回调函数，e=>e.key
 */
export const groupArrayByKey = (array, f) => {
  if (Object.prototype.toString.call(array) !== "[object Array]") return []
  let groups = {};
  array.forEach(o => {
    let group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map((group) => {
    return groups[group];
  });
}
/**
 * @method groupArrayByValue 数组对象按对象值分组
 * @param array 数组
 * @param f 回调函数，e=>e.key===value
 */
export const groupArrayByValue = (array, f) => {
  if (Object.prototype.toString.call(array) !== "[object Array]") return []
  let newArray = [];
  array.forEach(e => {
    let isTrue = f(e);
    if (isTrue) {
      newArray.push(e)
    }
  });
  return newArray
}
/**
 * @method handlePhone 手机号脱敏
 */
export const handlePhone = (str) => {
  const pho = /(\d{3})\d*(\d{4})/;
  return str.replace(pho, "$1****$2")
}
/**
 * @method copyText 一键复制
 */
export const copyText = (dom) => {
  const text = dom.innerText;
  const inputDom = document.createElement("input");
  inputDom.value = text;
  document.body.appendChild(inputDom);
  inputDom.select();
  let SUCCESS = true;
  try {
    if (document.execCommand('copy', false, null)) {
      document.execCommand("Copy");
      SUCCESS = true;
    } else {
      SUCCESS = false;
    }
  } catch (err) {
    SUCCESS = false;
  }
  document.body.removeChild(inputDom);
  return SUCCESS
}
/**
 * @method getRootNodesByTraversUp 向上遍历获取符合条件节点的所有根节点
 * @param treeData 树形数组
 * @param f 回调函数，e=>e.checked
 */
export const getRootNodesByTraversUp = (treeData, f) => {
  function traverse(tree, func, checkedNodes = []) {
    if (Object.prototype.toString.call(tree) !== "[object Array]") return false
    if (typeof func !== "function") return false
    for (let node of tree) {
      checkedNodes.push(node);
      if (func(node)) return checkedNodes
      if (node.children && node.children.length) {
        const findChildren = traverse(node.children, func, checkedNodes);
        if (findChildren.length) return findChildren
      }
      checkedNodes.pop();
    }
    return []
  }
  return traverse(treeData, f);
}
/**
 * @method getAllCheckedNodesByTraversDown 向下遍历获取树形结构中符合条件的所有节点
 * @param treeData 树形数组
 * @param f 回调函数，e=>e.checked
 */
export const getAllCheckedNodesByTraversDown = (treeData, f) => {
  function traverse(tree, func, checkedNodes = []) {
    if (Object.prototype.toString.call(tree) !== "[object Array]") return false
    if (typeof func !== "function") return false
    for (let i = 0; i < tree.length; i++) {
      let node = tree[i];
      if (func(node)) {
        checkedNodes.push(node);
      }
      if (node.children && node.children.length) {
        traverse(node.children, func, checkedNodes);
      }

    }
    return checkedNodes
  }
  return traverse(treeData, f);
}