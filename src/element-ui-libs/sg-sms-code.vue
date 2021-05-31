<template>
  <div class="sg-smscode">
    <el-input
      :value="value"
      @input="$emit('input', $event)"
      placeholder="请输入短信验证码"
      clearable
    >
      <span v-if="prefixIcon" slot="prefix" :class="prefixIcon"></span>
    </el-input>
    <el-button class="sg-smscode-btn" @click="clickOpt" :disabled="disabled">{{
      timeOpened ? `已发送${timeAccount}s` : '获取验证码'
    }}</el-button>
  </div>
</template>
<script>
export default {
  props: {
    value: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    },
    prefixIcon: {
      type: String, // 头部图标类名
      default: ''
    },
    remoteMethod: Function
  },
  data () {
    return {
      timeNumber: 60, // 倒计时数值，单位s
      timeAccount: 0,
      timeOpened: false, // 倒计时是否开启
      timerId: null
    }
  },
  mounted () { },
  methods: {
    clickOpt () {
      if (this.timeOpened) return
      this.remoteMethod().then((res) => {
        if (res) {
          this.addTimeClock()
        }
      })
    },
    // 添加定时器
    addTimeClock () {
      this.timeOpened = true
      this.timeAccount = this.timeNumber
      this.timerId && clearInterval(this.timerId)
      this.timerId = setInterval(() => {
        this.timeAccount--
        if (this.timeAccount <= 0) {
          clearInterval(this.timerId)
          this.timeAccount = this.timeNumber
          this.timeOpened = false
        }
      }, 1000)

      this.$once('hook:beforeDestroy', () => {
        this.timerId && clearInterval(this.timerId)
      })
    },
    reset () {
      this.timeAccount = 0
      this.timeOpened = false
      this.timerId && clearInterval(this.timerId)
      this.timerId = null
    }
  }
}
</script>
<style lang="less" scoped>
.sg-smscode {
  display: flex;
  align-items: center;
  .el-input {
    flex: 1;
    margin-right: 10px;
  }
}
.sg-smscode-btn {
  width: 102px;
  height: 32px;
  line-height: 32px;
  padding: 0;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid rgba(217, 217, 217, 1);
}
</style>
