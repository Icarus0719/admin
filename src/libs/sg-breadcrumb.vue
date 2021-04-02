<template>
  <el-breadcrumb v-if="data.length" separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in data"
      :key="index"
      :to="item.path"
      >{{ item.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>
<script>
export default {
  props: {
    data: {
      type: Array, //路由对象树节点值,数据结构参见auth模块的routerTree
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>