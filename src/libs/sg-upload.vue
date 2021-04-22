<template>
  <div>
    <el-upload
      ref="upload"
      action="customize"
      :accept="accept"
      :limit="limit > 1 ? limit : 0"
      :on-change="fileChange"
      :on-exceed="handleExceed"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :multiple="multiple"
      :auto-upload="autoUpload"
      :disabled="disabled"
      :list-type="listType"
      :file-list="fileList"
      :show-file-list="showFilelList"
      :http-request="uploadMethod"
      class="sg-upload"
    >
      <!-- 上传图片按钮 -->
      <div v-if="fileType === 'picture'" class="upload-button-image">
        <img v-if="coverImageUrl" :src="coverImageUrl" />
        <span v-if="limit > 1 || !coverImageUrl" class="el-icon-plus"></span>

        <!-- 图片遮罩 -->
        <div
          v-if="coverImageUrl"
          class="upload-mask"
          @click.self="disabled = true"
        >
          <span
            class="el-icon-delete pointer sg-box-mr10"
            @click.stop="deleteFile"
          ></span>
          <span @click.self="disabled = true">|</span>
          <span
            class="el-icon-edit pointer sg-box-ml10"
            @click.self="disabled = false"
          ></span>
        </div>
      </div>
      <!-- 上传文本按钮 -->
      <div v-else class="el-icon-upload upload-button-text">上传文件</div>
    </el-upload>
    <slot name="tip"></slot>
  </div>
</template>
<script>
import { Message } from 'element-ui';
export default {
  props: {
    value: Array, // 文件列表数据[{name,fileUrl,fileId}]
    size: {
      type: Number,
      default: 2, // 文件允许的最大体积，单位:M
    },
    accept: {
      type: String,
      default: '.JPG,.PNG,.JPEG', // 文件格式
    },
    limit: {
      type: Number,
      default: 1, // 最大允许上传个数
    },
    multiple: {
      type: Boolean,
      default: false, // 是否支持多选文件
    },
    showFilelList: {
      type: Boolean,
      default: false, // 是否显示上传文件列表
    },
    listType: {
      type: String,
      default: 'text', // 文件列表的类型
    },
    autoUpload: {
      type: Boolean, // 是否在选取文件后立即进行上传
      default: false,
    },
    httpRequest: {
      type: Function, // 远程上传服务器函数,函数参数是file对象
    },
  },
  data() {
    return {
      fileType: 'picture', // 上传文件的类型
      fileList: [], // 上传的文件列表
      disabled: false, // 是否禁用上传
      coverImageUrl: '', // 当前封面图片地址
    };
  },
  watch: {
    accept: {
      handler(newVal) {
        if (newVal.toLocaleLowerCase().search(/png|jpg|jpeg|gif|bmp$/) > -1) {
          this.fileType = 'picture';
        } else {
          this.fileType = 'text';
        }
      },
      immediate: true,
    },
    value(newVal) {
      this.fileList = newVal;
    },
    fileList: {
      handler(newVal) {
        if (this.fileType === 'picture' && this.limit === 1) {
          // 更新封面图片
          this.coverImageUrl = '';
          const lastFile = newVal.slice(-1)[0] || {};
          if (lastFile.fileUrl) {
            this.coverImageUrl = lastFile.fileUrl;
          }
          if (lastFile.raw) {
            this.coverImageUrl = URL.createObjectURL(lastFile.raw);
          }
        }
        // 定义双向绑定值
        this.$emit('input', newVal);
      },
      deep: true,
    },
  },
  mounted() {},
  methods: {
    handleExceed() {
      Message.warning(`最多允许上传${this.limit}个文件`);
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    beforeUpload(file) {
      return this._IsAcceptedFile(file);
    },
    uploadMethod(param) {
      this.httpRequest(param.file);
    },
    fileChange(file, fileList) {
      if (!this.autoUpload && !this._IsAcceptedFile(file)) return false;
      this._HandleChange(file, fileList);
    },
    // 选择文件之后控制文件列表和封面
    _HandleChange(file, fileList) {
      this.fileList = fileList.slice(-this.limit);
    },
    // 上传文件校验
    _IsAcceptedFile(file, fileList) {
      const formats = this.accept.toLocaleLowerCase().split(',');
      const rightFile = formats.some((e) => {
        return file.name.toLocaleLowerCase().search(e);
      });
      if (!rightFile) {
        Message({ message: '文件格式不正确', type: 'warning' });
        fileList && fileList.pop();
        return false;
      }
      if (file.size / 1024 / 1024 > this.size) {
        Message({
          message: `文件大小不能超过${this.size}M`,
          type: 'warning',
        });
        fileList && fileList.pop();
        return false;
      }
      return true;
    },
    deleteFile() {
      this.fileList.pop();
    },
  },
};
</script>
<style lang="less" scoped>
.sg-upload {
  line-height: 0;
}
// 上传按钮
.upload-button {
  &-image {
    width: 138px;
    height: 104px;
    position: relative;
    background: rgba(250, 250, 250, 1);
    border-radius: 4px;
    border: 1px solid rgba(217, 217, 217, 1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: rgba(0, 0, 0, 0.65);
    font-size: 24px;
    img {
      height: 100%;
      object-fit: fill;
    }
    p {
      font-size: 14px;
      line-height: 22px;
    }
  }
  &-text {
    color: rgba(0, 0, 0, 0.65);
    width: 106px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
  }
}
// 图片遮罩
.upload-mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  z-index: 111;
  opacity: 0;

  &:hover {
    animation: uploadMask 1s linear forwards;
  }
}
@keyframes uploadMask {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>