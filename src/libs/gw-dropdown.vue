<template>
  <van-dropdown-menu v-if="options.length" active-color="#1989fa" ref="vanDropdown">
    <van-dropdown-item
      v-model="dropValue"
      :options="options"
      @change="changeOpt"
      @opened="addScrollListener"
    />
  </van-dropdown-menu>
</template>
<script>
import {
  DropdownMenu as VanDropdownMenu,
  DropdownItem as VanDropdownItem
} from "vant";
export default {
  components: {
    VanDropdownMenu,
    VanDropdownItem
  },
  props: {
    value: [String, Number],
    options: {
      type: Array, //数组项结构[{text:ss,value:ss,...key}]
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      dropValue: "",
      srcollDom: null
    };
  },
  watch: {
    value(newVal) {
      this.dropValue = newVal;
    }
  },
  mounted() {},
  methods: {
    changeOpt(value) {
      this.$emit("change", value);
      this.$emit("input", value);
    },
    addScrollListener() {
      const dropdownDom = this.$refs["vanDropdown"].$el;
      this.srcollDom = dropdownDom.querySelector(".van-dropdown-item__content");
      if (this.srcollDom) {
        this.srcollDom.addEventListener("scroll", this.scrollFunc);
      }
    },
    scrollFunc() {
      const CONDITION =
        this.srcollDom.scrollHeight - this.srcollDom.scrollTop <=
        this.srcollDom.clientHeight;
      if (CONDITION) {
        this.$emit("loadmore");
      }
    }
  }
};
</script>
<style lang="less">
@import "../assets/css/libs.vant/dropdown.less";
</style>