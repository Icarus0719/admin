<template>
  <div class="login-footer">
    <span> &copy;{{ year }} 中移物联网(华东) </span>
    <a href="http://beian.miit.gov.cn" target="_blank">渝ICP备13005647号</a>
    <span> 邮箱：znzzcs@cmiot.chinamobile.com 客服服务热线 10086</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style lang="less" scoped>
.login-footer {
  display: block;
  width: 100%;
  height: 22px;
  line-height: 22px;
  text-align: center;
  position: absolute;
  bottom: 20px;
}
</style>


