<template>
  <div ref="echartDom"></div>
</template>
<script>
var echarts = require("echarts");
export default {
  props: {
    option: Object,
    loading: Boolean
  },
  data() {
    return {
      loadingStyle: {
        text: "loading",
        color: "#fff",
        textColor: "#fff",
        maskColor: "rgba(0,0,0,0.3)"
      },
      Echart: null
    };
  },
  watch: {
    loading(newVal) {
      if (newVal) {
        this.Echart.showLoading(this.loadingStyle);
      } else {
        this.Echart.hideLoading();
      }
    },
    option: {
      handler() {
        this.renderEchart();
      },
      deep: true
    }
  },
  beforeDestroy() {
    this.Echart && echarts.dispose(this.Echart);
  },
  mounted() {
    this.$nextTick(() => {
      this.Echart = echarts.init(this.$refs.echartDom);
      this.loading && this.Echart.showLoading(this.loadingStyle);
    });

    window.addEventListener("resize", () => {
      this.Echart.resize();
    });
  },
  methods: {
    renderEchart() {
      this.Echart.setOption(this.option);
    }
  }
};
</script>