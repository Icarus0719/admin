<template>
  <el-dropdown
    v-if="options.length"
    @command="handleCommand"
    :placement="placement"
    :trigger="trigger"
  >
    <span>
      {{ value }}
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu
      :class="popperClass"
      slot="dropdown"
      v-loadmore="loadMoreOpt"
    >
      <el-dropdown-item
        :class="{ 'sg-dropdown-item__active': item.value === value }"
        v-for="(item, index) in options"
        :key="index"
        :command="item"
        >{{ item.value }}</el-dropdown-item
      >
      <slot></slot>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  props: {
    trigger: {
      type: String,
      default: "hover",
    },
    placement: {
      type: String,
      default: "bottom",
    },
    popperClass: String,
    value: [String, Number],
    options: {
      type: Array, //数组项结构[{value:ss,...key}]
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    handleCommand(command) {
      this.$emit("input", command.value);
      this.$emit("command", command);
    },
    loadMoreOpt() {
      this.$emit("loadmore");
    },
  },
};
</script>