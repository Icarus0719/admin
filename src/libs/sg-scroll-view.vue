<template>
  <!-- element有自己的无限加载自定义指令，此组件仅作为参考使用 -->
  <div ref="scroll" class="scroll-view">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    lowerThreshold: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      srcollDom: null,
      isToLower: false,
      scrollHeight: 0,
    };
  },
  watch: {
    scrollHeight(newVal) {
      if (newVal || newVal === 0) {
        // 新值--说明内容有增减，需重新设置节流
        this.isToLower = false;
      }
    },
  },
  beforeDestroy() {
    this.srcollDom &&
      this.srcollDom.removeEventListener("scroll", this.scrollFunc);
  },
  mounted() {
    this.$nextTick(() => {
      this.srcollDom = this.$refs.scroll;
      if (this.srcollDom) {
        this.srcollDom.addEventListener("scroll", this.scrollFunc);
      }
    });
  },
  methods: {
    scrollFunc() {
      this.scrollHeight = this.srcollDom.scrollHeight;
      // 节流
      if (this.isToLower) return;

      this.isToLower =
        this.srcollDom.scrollHeight -
          this.srcollDom.scrollTop -
          Number(this.lowerThreshold) <=
        this.srcollDom.clientHeight;
      if (this.isToLower) {
        // 滚动到底部
        this.$emit("toLower");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.scroll-view {
  overflow: auto;
}
</style>
