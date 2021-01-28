<template>
  <!-- 下拉刷新和加载更多 -->
  <van-pull-refresh v-model="pullRefreshing" success-text="刷新成功" @refresh="onRefresh">
    <van-list
      v-model="listLoading"
      :finished="listFinished"
      finished-text="没有更多了"
      :immediate-check="false"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <slot></slot>
    </van-list>
  </van-pull-refresh>
</template>
<script>
import { PullRefresh as VanPullRefresh, List as VanList } from "vant";
export default {
  components: {
    VanPullRefresh,
    VanList
  },
  props: {
    refreshing: Boolean, //支持sync修饰符
    loading: Boolean, //支持sync修饰符
    finished: Boolean, //支持sync修饰符
    error: {
      type: Boolean, //列表是否加载失败
      default: false
    }
  },
  data() {
    return {
      pullRefreshing: false, //下拉刷新是否处于加载状态
      listLoading: false, //列表组件是否处于加载状态
      listFinished: false //列表是否加载完成
    };
  },
  watch: {
    refreshing(newVal) {
      this.pullRefreshing = newVal;
    },
    loading(newVal) {
      this.listLoading = newVal;
    },
    finished(newVal) {
      this.listFinished = newVal;
    }
  },
  mounted() {},
  methods: {
    onLoad() {
      // 滚动条与底部距离小于offset时触发
      this.$emit("load");
    },
    onRefresh() {
      // 清空列表数据
      this.listFinished = false;
      this.$emit("update:refreshing", true);
      this.$emit("update:finished", false);
      // 重新加载数据,将 loading 设置为 true，表示处于加载状态
      this.$emit("update:loading", true);
      this.listLoading = true;
      this.$emit("refresh");
    }
  }
};
</script>