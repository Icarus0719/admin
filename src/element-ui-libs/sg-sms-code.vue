<template>
  <div class="sg-smscode">
    <el-input
      :value="value"
      @input="$emit('input', $event)"
      placeholder="请输入短信验证码"
      clearable
    >
      <span slot="prefix" class="el-icon-message"></span>
    </el-input>
    <el-button class="sg-smscode-btn" @click="clickOpt" :disabled="disabled">{{
      timeOpened ? `已发送${timeAccount}s` : '获取短信验证码'
    }}</el-button>
  </div>
</template>
<script>
export default {
  props: {
    value: [String, Number],
    disabled: {
      type: Boolean,
      default: false,
    },
    remoteMethod: Function,
  },
  data() {
    return {
      timeNumber: 60, //倒计时数值，单位s
      timeAccount: 0,
      timeOpened: false, //倒计时是否开启
      timerId: null,
    };
  },
  mounted() {},
  methods: {
    clickOpt() {
      if (this.timeOpened) return;
      this.remoteMethod().then((res) => {
        if (res) {
          this.addTimeClock();
        }
      });
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