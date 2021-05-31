/**
 * @method deepClone 复杂对象深拷贝
 * @param obj
 */
export const deepClone = (obj) => {
  function copy(obj) {
    if (obj === null) return null
    if (typeof obj !== 'object') return obj
    if (obj.constructor === Date) return new Date(obj)
    if (obj.constructor === RegExp) return new RegExp(obj)
    var newObj = new obj.constructor() //保持继承链
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        //不遍历其原型链上的属性
        var val = obj[key]
        newObj[key] = typeof val === 'object' ? copy(val) : val
      }
    }
    return newObj
  }
  return copy(obj)
}
/**
 * @method deepMerge 合并对象
 */
export const deepMerge = (minor, main) => {
  for (let key in minor) {
    if (main[key] === undefined) {
      // 不冲突的，直接赋值
      main[key] = minor[key]
      continue
    }
    // 冲突了，如果是Object，看看有么有不冲突的属性
    // 不是Object 则以main为主，忽略即可
    if (isJSON(minor[key])) {
      deepMerge(minor[key], main[key])
    }
  }
  return main
  function isJSON(target) {
    return typeof target == 'object' && target.constructor == Object
  }
}
