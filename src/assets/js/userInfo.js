class UserInfo {
  constructor(source) {
    // source可传localstorage/sessionstorage
    this.source = source || window.localStorage
    this.userKey = "erp_userInfo";
  }
  setInfo(data) {
    this.setStorage(this.userKey, data)
  }
  getInfo() {
    const userInfo = this.getStorage(this.userKey) || {};
    return userInfo
  }
  isLogin() {
    const userInfo = this.getStorage(this.userKey);
    const token = userInfo && userInfo.token;
    if (!token) return false;
    return true
  }
  exitLogin() {
    this.clearStorage();
    this.redirect();
  }
  clearStorage() {
    let source = this.source;
    source.clear();
  }
  redirect() {
    const url = `${window.location.origin}${window.location.pathname}#/login`
    window.location.href = url;
    // 此处强制刷新，原因有二：一，碰到过IE浏览器直接重设href后，地址变了，但不会跳转页面；
    // 二、是在使用动态添加路由去做权限管理时，如果异步路由中有redirect的话，那么会出现不同账户在退出和登录切换时，不刷新的话，
    // router.to对象指向的是上一个用户的路由列表中写的重定向路由
    window.location.reload();
  }
  setStorage(key, value) {
    let source = this.source;
    if (Object.prototype.toString.call(value) === '[object Object]' || Object.prototype.toString.call(value) === '[object Array]') {
      value = JSON.stringify(value);
    }
    source.setItem(key, value);
  }
  getStorage(key) {
    const source = this.source;
    let item = source.getItem(key);
    let value;
    try {
      value = JSON.parse(item);
    } catch {
      value = item;
    }
    return value
  }
}
export default UserInfo