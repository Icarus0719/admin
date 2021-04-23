<template>
  <div class="login">
    <TheLangButton />
    <FormLogin></FormLogin>
  </div>
</template>
<script>
import FormLogin from '@/business/FormLogin.vue';
import TheLangButton from '@/components/TheLangButton.vue';

export default {
  name: 'login',
  components: { FormLogin, TheLangButton },
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
  background: url('../assets/images/login_bg.jpg') no-repeat center;
  background-size: 100% 100%;
}
</style>