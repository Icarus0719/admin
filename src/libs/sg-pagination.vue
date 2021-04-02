<template>
  <el-pagination
    v-if="total > 0"
    :small="small"
    background
    @size-change="sizeChange"
    @current-change="pageChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="curPageSize"
    :popper-class="popperClass"
    :layout="layout"
    :total="total"
  ></el-pagination>
</template>
<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20];
      },
    },
    pageNum: Number,
    pageSize: Number,
    popperClass: String,
    small: {
      type: Boolean,
      default: false,
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next',
    },
  },
  watch: {
    pageNum(newVal) {
      if (newVal) this.currentPage = newVal;
    },
    pageSize(newVal) {
      if (newVal) this.curPageSize = newVal;
    },
  },
  data() {
    return {
      currentPage: this.pageNum,
      curPageSize: this.pageSize,
    };
  },
  methods: {
    sizeChange(size) {
      this.curPageSize = size;
      this.currentPage = 1;
      this.$emit('change', {
        pageNum: this.currentPage,
        pageSize: this.curPageSize,
      });
    },
    pageChange(page) {
      this.currentPage = page;
      this.$emit('change', {
        pageNum: this.currentPage,
        pageSize: this.curPageSize,
      });
    },
  },
};
</script>