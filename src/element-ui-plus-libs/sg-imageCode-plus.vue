<template>
  <div class="sg-imagecode">
    <el-input
      type="text"
      v-model="Attributes.imageCode"
      @input="$emit('update:imageCode', $event)"
      placeholder="请输入验证码"
      clearable
      prefix-icon="el-icon-key"
    >
    </el-input>
    <img
      class="sg-imagecode-btn"
      :src="Attributes.imageCodeUrl"
      alt="图片"
      @click="getImageCode()"
    />
  </div>
</template>
<script>
import * as API from '@/api/api.account.js';
import { reactive, onMounted } from 'vue';
export default {
  props: {
    imageCode: [Number, String],
    imageId: Number,
  },
  emits: ['update:imageCode', 'update:imageId'],
  setup(props, { emit }) {
    let Attributes = reactive({
      imageCode: '',
      imageId: '',
      imageCodeUrl: '',
    });
    onMounted(() => {
      getImageCode();
    });
    const getImageCode = async () => {
      Attributes.imageId = new Date().getTime();
      emit('update:imageId', Attributes.imageId);
      const params = {
        imageWidth: 90,
        imageHeight: 40,
        imageId: Attributes.imageId,
      };
      const response = await API.getImageCode(params);
      if (response) {
        Attributes.imageCodeUrl &&
          window.URL.revokeObjectURL(Attributes.imageCodeUrl);
        Attributes.imageCodeUrl = window.URL.createObjectURL(response);
      }
    };
    return {
      Attributes,
      getImageCode,
    };
  },
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
  width: 102px;
  height: 44px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid rgba(217, 217, 217, 1);
}
</style>