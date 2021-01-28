<template>
  <div class="sg-imagecode">
    <el-input
      type="text"
      v-model="Attributes.imageCode"
      @input="$emit('input', $event)"
      placeholder="请输入图片验证码"
      clearable
    >
      <span slot="prefix" class="iconfont iconkey"></span>
    </el-input>
    <img :src="imageCodeUrl" alt="图片" @click="getImageCode()" />
  </div>
</template>
<script>
import API from "@/api/api";
export default {
  props: {
    value: [Number, String]
  },
  data() {
    return {
      imageCodeUrl: "",
      Attributes: {
        imageCode: "",
        imageId: ""
      }
    };
  },
  watch: {
    value(newVal) {
      this.Attributes.imageCode = newVal;
    },
    "Attributes.imageId"() {
      this.$emit("change", this.Attributes);
    }
  },
  mounted() {
    this.getImageCode();
  },
  methods: {
    getImageCode() {
      this.Attributes.imageId = new Date().getTime();
      const params = {
        imageWidth: 90,
        imageHeight: 40,
        imageId: this.Attributes.imageId
      };
      API.getImageCode(params).then(res => {
        if (this.imageCodeUrl) {
          window.URL.revokeObjectURL(this.imageCodeUrl);
        }
        this.imageCodeUrl = window.URL.createObjectURL(res);
      });
    }
  }
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

  img {
    width: 130px;
    height: 40px;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid rgba(217, 217, 217, 1);
  }
}
</style>