<template>
  <el-cascader
    v-model="selectValue"
    :options="options"
    :props="props"
    :placeholder="placeholder"
    @change="changeOpt"
    clearable
  ></el-cascader>
</template>
<script>
export default {
  model: {
    event: "change"
  },
  props: {
    placeholder: {
      type: String,
      default: "请选择"
    },
    props: {
      type: Object,
      default() {
        return {};
      }
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    value: [String, Number, Array],
    disabled: Boolean
  },
  data() {
    return {
      selectValue: ""
    };
  },
  watch: {
    value(newVal) {
      this.selectValue = newVal;
    }
  },
  mounted() {},
  methods: {
    changeOpt($event) {
      if (!$event) return false;
      this.$emit("change", $event[$event.length - 1]);
    }
  }
};
</script>
