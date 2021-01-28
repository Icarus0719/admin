<template>
  <div class="sg-smscode">
    <el-input
      v-model="Attributes.smsCode"
      @input="$emit('input', $event)"
      placeholder="请输入短信验证码"
      clearable
    >
      <slot name="prefix" slot="prefix"></slot>
    </el-input>
    <el-button
      class="smscode-button"
      @click="clickOpt"
      :disabled="Attributes.disabled"
    >{{status==='close'?"获取短信验证码":"已发送"+timeNum+"s"}}</el-button>
  </div>
</template>
<script>
import API from "@/api/api";

export default {
  props: {
    value: [String, Number],
    disabled: Boolean,
    model: Object,
    httpRequest: {
      type: Boolean, //是否直接请求后台接口
      default: true
    },
    action: {
      type: String, //调用后台发送信息验证码的接口名
      default: "sendSmsCodeInLogin"
    }
  },
  data() {
    return {
      status: "close", //open--开启计时，close---关闭计时
      Attributes: {
        smsCode: "",
        disabled: true //是否禁用
      },
      timeNum: 60, //倒计时数值，单位s
      timer: null
    };
  },
  watch: {
    value(newVal) {
      this.Attributes.smsCode = newVal;
    },
    disabled(newVal) {
      this.Attributes.disabled = newVal;
    },
    status(newVal) {
      if (newVal === "close") {
        this.Attributes.disabled = false;
      } else {
        this.Attributes.disabled = true;
      }
    }
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer);
  },
  mounted() {},
  methods: {
    clickOpt() {
      this.$emit("click");
      if (this.httpRequest) this.sendSmsCode();
    },
    async sendSmsCode() {
      const { phone, imageCode, imageId } = this.model;
      const response = await API[this.action]({
        phone,
        imageCode,
        imageId
      });
      if (response) {
        this.$message({
          type: "success",
          message: "验证码已发送，请注意查收！"
        });
        this.openClock();
      }
    },
    openClock() {
      // 启动定时器
      this.status = "open";
      this.timer && clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.timeNum--;
        if (this.timeNum <= 0) {
          clearInterval(this.timer);
          this.timeNum = 60;
          this.status = "close";
        }
      }, 1000);
    },
    reset() {
      this.timeNum = 60;
      this.status = "close";
      this.Attributes.disabled = false;
      this.Attributes.smsCode = "";
      this.timer && clearInterval(this.timer);
    }
  }
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

  .smscode-button {
    width: 130px;
    height: 40px;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid rgba(217, 217, 217, 1);
  }
}
</style>