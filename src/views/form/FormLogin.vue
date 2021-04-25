<template>
  <div class="form-login">
    <el-form :model="form" class="form-login" ref="form" :rules="formRules">
      <div class="login-title">后台管理平台</div>

      <el-form-item prop="account">
        <el-input
          v-model.trim="form.account"
          placeholder="请输入账号"
          clearable
        >
          <span slot="prefix" class="el-icon-user"></span>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model.trim="form.password"
          placeholder="请输入密码"
          clearable
          show-password
        >
          <span slot="prefix" class="el-icon-lock"></span>
        </el-input>
      </el-form-item>
      <el-form-item prop="imageCode">
        <ImageCode
          v-model="form.imageCode"
          :remote-method="getImageCode"
          :image-url="imageCodeUrl"
        />
      </el-form-item>
      <el-form-item prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号" clearable>
          <span slot="prefix" class="el-icon-phone-outline"></span>
        </el-input>
      </el-form-item>
      <el-form-item prop="verifCode">
        <SmsCode v-model="form.verifCode" :remote-method="sendSmsCode" />
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-botton"
          type="primary"
          @click="confirmForm"
          v-oneClick
        >
          {{ $t('Login.button') }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import API from '@/api/api';
import { formRules } from '@/assets/js/formRules';
import SmsCode from '@/element-ui-libs/sg-sms-code.vue';
import ImageCode from '@/element-ui-libs/sg-image-code.vue';

export default {
  components: { SmsCode, ImageCode },
  data() {
    return {
      form: {},
      imageCodeUrl: '',
      formRules,
      err_phone: true,
    };
  },
  mounted() {
    // this.getImageCode();
  },
  methods: {
    async getImageCode() {
      const imageId = new Date().getTime();
      this.form.imageId = imageId;
      const params = {
        imageWidth: 90,
        imageHeight: 40,
        imageId: imageId,
      };
      const response = await API.getImageCode(params);
      if (response) {
        this.imageCodeUrl && window.URL.revokeObjectURL(this.imageCodeUrl);
        this.imageCodeUrl = window.URL.createObjectURL(response);
      }
    },
    async sendSmsCode() {
      const { phone, imageCode, imageId } = this.form;
      const response = await API.sendSmsCodeInLogin({
        phone,
        imageCode,
        imageId,
      });
      if (response) return true;
    },
    confirmForm() {
      this.submitModule();
      this.$refs['form'].validate(async (valid) => {
        if (!valid) return false;
        this.submitModule();
      });
    },
    async submitModule() {
      const params = {
        ...this.form,
        // password: this.$md5(this.form.password),
      };
      const response = await API.submitLogin(params);
      console.log(response);
      if (response) {
        this.$user.setInfo(response.data);
        console.log(1);
        this.$router.push({ name: 'home' });
      } else {
        this.getImageCode();
      }
    },
  },
};
</script>
<style lang="less" scoped>
.form-login {
  width: 368px;
  position: absolute;
  right: 10vw;
  top: 50%;
  transform: translateY(-50%);
  .login-title {
    line-height: 50px;
    font-size: 36px;
    margin-bottom: 30px;
    text-align: center;
    color: #1387f2;
  }
  .login-botton {
    width: 100%;
  }
}
</style>