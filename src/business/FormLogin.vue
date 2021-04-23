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
        <image-code
          ref="imageCode"
          v-model="form.imageCode"
          @change="getImageCodeData"
        ></image-code>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号" clearable>
          <span slot="prefix" class="el-icon-phone-outline"></span>
        </el-input>
      </el-form-item>
      <el-form-item prop="verifCode">
        <sms-code
          ref="smsCode"
          v-model="form.verifCode"
          :disabled="err_imageCode || err_phone"
          :api-params="{
            phone: form.phone,
            imageCode: form.imageCode,
            imageId: form.imageId,
          }"
        ></sms-code>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-botton"
          type="primary"
          @click="confirmForm"
          v-oneClick
          > {{ $t("Login.button") }}</el-button
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
      formRules,
      err_imageCode: true,
      err_phone: true,
    };
  },
  watch: {
    'form.imageCode'() {
      this.$refs['form'].validateField('imageCode', (err) => {
        this.err_imageCode = Boolean(err);
      });
    },
    'form.phone'() {
      this.$refs['form'].validateField('phone', (err) => {
        this.err_phone = Boolean(err);
      });
    },
  },
  mounted() {},
  methods: {
    getImageCodeData(data) {
      this.$set(this.form, 'imageId', data.imageId);
    },
    confirmForm() {
      this.$refs['form'].validate(async (valid) => {
        if (!valid) return false;
        this.submitModule();
      });
    },
    async submitModule() {
      const params = {
        ...this.form,
        password: this.$md5(this.form.password),
      };
      const response = await API.submitLogin(params);
      if (response) {
        this.$user.setInfo(response.data);
        this.$router.push(`/index`);
      } else {
        this.$refs.imageCode.getImageCode();
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