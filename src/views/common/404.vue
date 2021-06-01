<template>
  <div class="errorpage">
    <div class="error-text">400</div>
    <p class="error-tip">抱歉您访问的页面失联啦</p>
    <el-button type="primary" size="small" @click="$router.go(-1)"
      >请返回上一页</el-button
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      errorImage: '/static/images/404.png'
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.errorpage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #011931;
  overflow: hidden;
  pad: 0 20px;
  color: #fff;
  .error-text {
    font-size: 140px;
  }
}
.bg-white {
  background: #fff;
}
.error-tip {
  line-height: 56px;
  font-size: 16px;
  color: #999;
}
</style>

