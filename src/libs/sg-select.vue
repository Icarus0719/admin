<template>
  <div>
    <el-select
      ref="select"
      v-model="selectValue"
      :placeholder="placeholder"
      :popper-class="popperClass"
      :multiple="multiple"
      :filterable="filterable"
      :remote="remote"
      :class="selectClass"
      :popper-append-to-body="false"
      @change="changeOpt"
      @visible-change="visibleOpt"
      :remote-method="remoteMethod"
      clearable
      :disabled="disabled"
      :value-key="valueKey"
    >
      <el-option
        v-for="item in optionData"
        :key="item[optionValue]"
        :label="item[optionLabel]"
        :value="selectItem ? item : item[optionValue]"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  model: {
    event: 'change',
  },
  props: {
    placeholder: {
      type: String,
      default: '请选择',
    },
    value: [String, Number, Array, Object],
    selectItem: {
      type: Boolean, // 是否获取整个item
      default: false,
    },
    selectClass: String,
    popperClass: String,
    disabled: Boolean,
    multiple: {
      type: Boolean, // 是否支持多选
      default: false,
    },
    filterable: {
      type: Boolean, // 是否可搜索
      default: true,
    },
    remote: {
      type: Boolean, //是否远程搜索
      default: true,
    },
    optionLabel: {
      type: String, // option的label名称
      default: 'label',
    },
    optionValue: {
      type: String, // option的value名称
      default: 'value',
    },
    lowerThreshold: {
      type: [String, Number], // 距底部多远触发scrollFunc
      default: 0,
    },
    valueKey: {
      type: String, // 选中项为对象时的唯一标识key
      default() {
        return this.optionValue;
      },
    },
    optionData: {
      type: Array, // 选择器数据
      default() {
        return [];
      },
    },
    infiniteScroll: {
      type: Function, // 无限滚动函数
    },
    remoteMethod: {
      type: Function, // 远程搜索函数
    },
  },
  data() {
    return {
      selectValue: null,
      srcollDom: null,
      isToLower: false, // 滚动节流
      scrollHeight: 0,
    };
  },
  watch: {
    value(newVal) {
      this.selectValue = newVal;
    },
    scrollHeight(newVal) {
      if (newVal || newVal === 0) {
        // 新值--说明内容有增减，需重新设置节流
        this.isToLower = false;
      }
    },
  },
  mounted() {
    this.infiniteScroll && this.addScrollListener();
  },
  methods: {
    // 弹窗添加滚动条事件，ps:弹窗不要插入到body中，否则无法找到对应的dom
    async addScrollListener() {
      await this.$nextTick();
      if (!this.$refs['select']) return;
      const selectDom = this.$refs['select'].$el;
      this.srcollDom = selectDom.querySelector('.el-select-dropdown__wrap');
      if (this.srcollDom) {
        this.srcollDom.addEventListener('scroll', this.scrollFunc);
        this.$once('hook:beforeDestroy', () => {
          this.srcollDom.removeEventListener('scroll', this.scrollFunc);
        });
      }
    },
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
        // 滚动到底部,加载更多
        this.infiniteScroll();
      }
    },
    changeOpt(data) {
      this.$emit('change', data);
    },
    visibleOpt(visible) {
      if (!visible && this.remote && this.optionData.length === 0) {
        // 修复远程搜索无值时，初始化
        this.remoteMethod();
      }
    },
  },
};
</script>