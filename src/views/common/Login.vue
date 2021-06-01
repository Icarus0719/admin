<template>
  <div class="login">
    <FormLogin />
  </div>
</template>
<script>
import FormLogin from '@/views/form/FormLogin.vue';

export default {
  name: 'login',
  components: { FormLogin },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  position: relative;
  background: url('../../assets/images/login_bg.jpg') no-repeat center;
  background-size: 100% 100%;
}
</style>