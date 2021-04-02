<template>
  <div class="sg-smscode">
    <el-input
      v-model="Attributes.smsCode"
      @input="$emit('input', $event)"
      placeholder="请输入短信验证码"
      clearable
    >
      <span slot="prefix" class="el-icon-message"></span>
    </el-input>
    <el-button
      class="sg-smscode-btn"
      @click="clickOpt"
      :disabled="Attributes.disabled"
      >{{ timeOpened ? `已发送${timeAccount}s` : '获取短信验证码' }}</el-button
    >
  </div>
</template>
<script>
import API from '@/api/api';

export default {
  props: {
    value: [String, Number],
    disabled: {
      type: Boolean,
      default: false,
    },
    apiName: {
      type: String, //远程发送信息验证码接口名
      default: 'sendSmsCodeInLogin',
    },
    apiParams: {
      //发送短信所需参数选项
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      Attributes: {
        smsCode: '',
        disabled: true, //是否禁用
      },
      timeNumber: 10, //倒计时数值，单位s
      timeAccount: 0,
      timeOpened: false, //倒计时是否开启
      timerId: null,
    };
  },
  watch: {
    value(newVal) {
      this.Attributes.smsCode = newVal;
    },
    disabled(newVal) {
      this.Attributes.disabled = newVal;
    },
  },
  mounted() {},
  methods: {
    clickOpt() {
      if (this.timeOpened) return;
      this.sendSmsCode();
      this.$emit('click');
    },
    async sendSmsCode() {
      const response = await API[this.apiName](this.apiParams);
      if (response) this.addTimeClock();
    },
    // 添加定时器
    addTimeClock() {
      this.timeOpened = true;
      this.timeAccount = this.timeNumber;
      this.timerId && clearInterval(this.timerId);
      this.timerId = setInterval(() => {
        this.timeAccount--;
        if (this.timeAccount <= 0) {
          clearInterval(this.timerId);
          this.timeAccount = this.timeNumber;
          this.timeOpened = false;
        }
      }, 1000);

      this.$once('hook:beforeDestroy', () => {
        this.timerId && clearInterval(this.timerId);
      });
    },
    clear() {
      this.Attributes.disabled = false;
      this.timeOpened = false;
      this.Attributes.smsCode = '';
      this.timerId && clearInterval(this.timerId);
    },
  },
};
</script>
<style lang="less" scoped>
.sg-smscode {
  display: flex;
  align-items: center;
  .el-input {
    flex: 1;
    margin-right: 8px;
  }
}
.sg-smscode-btn {
  width: 130px;
  height: 40px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid rgba(217, 217, 217, 1);
}
</style>