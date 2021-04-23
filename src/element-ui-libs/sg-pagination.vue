<template>
  <el-pagination
    v-if="total > 0"
    background
    @size-change="sizeChange"
    @current-change="pageChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="curPageSize"
    :popper-class="popperClass"
    layout="total, sizes, prev, pager, next"
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
      this.$emit('update:pageNum', 1);
      this.$emit('update:pageSize', this.curPageSize);
      this.$emit('change');
    },
    pageChange(page) {
      this.currentPage = page;
      this.$emit('update:pageNum', this.currentPage);
      this.$emit('update:pageSize', this.curPageSize);
      this.$emit('change');
    },
  },
};
</script>