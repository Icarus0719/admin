<template>
  <div class="sg-imagecode">
    <el-input
      type="text"
      :value="value"
      @input="$emit('input', $event)"
      placeholder="请输入图片验证码"
      clearable
    >
      <span slot="prefix" class="el-icon-picture-outline"></span>
    </el-input>
    <img
      class="sg-imagecode-btn"
      :src="imageUrl"
      alt="图片"
      @click="remoteMethod"
    />
  </div>
</template>
<script>
export default {
  props: {
    value: [Number, String],
    imageUrl: String,
    remoteMethod: Function,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.sg-imagecode {
  display: flex;
  align-items: center;
  .el-input {
    flex: 1;
    margin-right: 8px;
  }
}
.sg-imagecode-btn {
  width: 130px;
  height: 40px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid rgba(217, 217, 217, 1);
}
</style>