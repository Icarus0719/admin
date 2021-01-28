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
      :loading="loading"
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
        :key="item.sgValue"
        :label="item.sgLabel"
        :value="isSelectItem ? item : item.sgValue"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
import API from "@/api/api";
export default {
  model: {
    event: "change",
  },
  props: {
    placeholder: {
      type: String,
      default: "请选择",
    },
    value: [String, Number, Array, Object],
    isSelectItem: {
      type: Boolean, //是否获取整个item
      default: false,
    },
    selectClass: String,
    popperClass: String,
    disabled: Boolean,
    multiple: {
      type: Boolean, //是否支持多选
      default: false,
    },
    filterable: {
      type: Boolean, //是否可搜索
      default: true,
    },
    remote: {
      type: Boolean, //是否远程搜索
      default: true,
    },
    infiniteScroll: {
      type: Boolean, //是否无线滚动加载更多
      default: true,
    },
    optionLabel: {
      type: String, //option的label名称
      default: "label",
    },
    optionValue: {
      type: String, //option的value名称
      default: "value",
    },
    apiName: {
      type: String, //远程服务查询接口名称
      required: true,
    },
    apiParams: {
      type: [String, Number, Object], //接口查询参数
      default () {
        return {};
      },
    },
    lowerThreshold: {
      type: [String, Number], //距底部多远触发scrollFunc
      default: 0,
    },
    immediate: {
      type: Boolean, //是否立即调用接口查询数据
      default: true,
    },
    valueKey: {
      type: String, //选中项为对象时的唯一标识key
      default: "optionValue"
    },
  },
  data () {
    return {
      selectValue: null,
      srcollDom: null,
      optionData: [],
      pageNum: 1,
      pageSize: 10,
      totalRecords: -1,
      isToLower: false, // 滚动节流
      scrollHeight: 0,
      loading: false,
      isInitRequest: true,// 首次远程请求
    };
  },
  computed: {
    requestParam () {
      let param = JSON.parse(JSON.stringify(this.apiParams));
      return param;
    },
  },
  watch: {
    value (newVal) {
      this.selectValue = newVal;
    },
    selectValue (newVal) {
      this.$emit("change", newVal, this._getNode(newVal));
    },
    apiParams (newVal, oldVal) {
      // 这里不直接用newVal判断，是因为select发生change时会触发watch
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        this.selectValue = this.isInitRequest ? this.selectValue : "";
        this.resetRequest()
      }
    },
    scrollHeight (newVal) {
      if (newVal || newVal === 0) {
        // 新值--说明内容有增减，需重新设置节流
        this.isToLower = false;
      }
    },
  },
  mounted () {
    this.immediate && this.getTableData();
  },
  methods: {
    async getTableData (more = false) {
      if (!this.apiName) return false;

      let params = this.requestParam;
      if (this.infiniteScroll) {
        params = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          ...params,
        };
      }
      const response = await API[this.apiName](params, false);
      if (response) {
        this.totalRecords = response.totalRecords || 0;
        this.loading = false;
        const resData = response.data || [];
        const newData = resData.map((e) => {
          return {
            sgLabel: e[this.optionLabel],
            sgValue: e[this.optionValue],
            ...e,
          };
        });
        this.optionData = more ? this.optionData.concat(newData) : newData;
      }
      this.addScrollListener();
      this.isInitRequest = false;
    },
    // 弹窗添加滚动条事件，ps:弹窗不要插入到body中，否则无法找到对应的dom
    async addScrollListener () {
      await this.$nextTick();
      if (!this.$refs["select"]) return;
      const selectDom = this.$refs["select"].$el;
      this.srcollDom = selectDom.querySelector(".el-select-dropdown__wrap");
      if (this.srcollDom) {
        this.srcollDom.addEventListener("scroll", this.scrollFunc);
        this.$once("hook:beforeDestroy", () => {
          this.srcollDom.removeEventListener("scroll", this.scrollFunc);
        });
      }
    },
    scrollFunc () {
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
        this.loadMore();
      }
    },
    loadMore () {
      if (this.optionData.length < this.totalRecords) {
        this.pageNum++;
        this.getTableData(true);
      }
    },
    changeOpt (data) {
      this.$emit("change", data, this._getNode(data));
    },
    _getNode (data) {
      return data ? this.optionData.filter(e => {
        return e[this.optionValue] === data
      })[0] : {}
    },
    visibleOpt (visible) {
      !visible && this.resetRequest();
    },
    resetRequest (val = null) {
      if (!this.remote) return
      if (this.requestParam[this.optionLabel] === val) return
      this.requestParam[this.optionLabel] = val
      this.pageNum = 1;
      this.getTableData();
    },
    remoteMethod (data) {
      this.resetRequest(data);
    },
  },
};
</script>