<template>
  <div class="form-login">
    <el-form :model="form" class="form-login" ref="form" :rules="GlobalRules">
      <div class="form-login-title">后台管理平台</div>

      <el-form-item prop="account">
        <el-input v-model.trim="form.account" placeholder="请输入账号" clearable>
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
        <ImageCode ref="imageCode" v-model="form.imageCode" @change="getImageData"></ImageCode>
      </el-form-item>

      <el-form-item prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号" clearable>
          <span slot="prefix" class="el-icon-phone-outline"></span>
        </el-input>
      </el-form-item>
      <el-form-item prop="verifCode">
        <SmsCode
          ref="smsCode"
          v-model="form.verifCode"
          :disabled="!(valid_imageCode&&valid_phone)"
          :model="form"
        ></SmsCode>
      </el-form-item>
      <el-form-item>
        <el-button class="login-botton" type="primary" @click="confirmForm" v-oneClick>登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import API from "@/api/api";
import GlobalRules from "@/assets/js/rules";
import SmsCode from "@/libs/sg-smsCode.vue";
import ImageCode from "@/libs/sg-imageCode.vue";

export default {
  components: { SmsCode, ImageCode },
  data () {
    return {
      form: {},
      GlobalRules,
      valid_imageCode: false,
      valid_phone: false
    };
  },
  watch: {
    "form.imageCode" () {
      this.$refs["form"].validateField("imageCode", err => {
        this.valid_imageCode = err ? false : true;
      });
    },
    "form.phone" () {
      this.$refs["form"].validateField("phone", err => {
        this.valid_phone = err ? false : true;
      });
    }
  },
  mounted () {
  },
  methods: {
    getImageData (data) {
      console.log(data);
      this.$set(this.form, "imageId", data.imageId);
    },
    confirmForm () {
      console.log(this.form);
      this.$refs["form"].validate(async valid => {
        if (!valid) return false;
        this.submitModule();
      });
    },
    async submitModule () {
      const params = {
        ...this.form,
        password: this.$md5(this.form.password)
      };
      const response = await API.submitLogin(params);
      if (response) {
        this.$user.setInfo(response.data);
        this.$router.push(`/index`);
      } else {
        this.$refs.imageCode.getImageCode();
      }
    },
    resetForm () {
      this.$refs["form"].resetFields();
      this.form = {};
      this.$refs.smsCode.reset();
    }
  }
};
</script>
<style lang="less" scoped>
.form-login {
  width: 368px;
  position: absolute;
  right: 10vw;
  top: 50%;
  transform: translateY(-50%);
  .form-login-title {
    line-height: 50px;
    font-size: 36px;
    margin-bottom: 30px;
    text-align: center;
    color: #1387f2;
  }
}
</style>