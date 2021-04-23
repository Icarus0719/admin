<template>
  <div class="errorpage">
    <img :src="errorImage" alt />
    <p class="error-text">当前账号无任何权限，请重新登录</p>
    <el-button type="primary" size="small" @click="toLogin">重新登录</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      errorImage: "/static/images/404.png",
    };
  },
  methods: {
    toLogin() {
      this.$user.exitLogin();
    },
  },
};
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
  img {
    width: 327px;
    height: 270px;
    max-width: 100%;
    object-fit: contain;
  }
}
.bg-white {
  background: #fff;
}
.error-text {
  line-height: 56px;
  color: #fff;
}
</style>

