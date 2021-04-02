<template>
  <div>
    <el-upload
      action="string"
      :accept="accept"
      :limit="limit > 1 ? limit : 0"
      :on-change="fileChange"
      :on-exceed="handleExceed"
      :on-remove="handleRemove"
      :multiple="multiple"
      :auto-upload="false"
      :disabled="uploadDisabled"
      :list-type="listType"
      :file-list="fileList"
      :show-file-list="showFilelList"
      class="sg-upload"
    >
      <!-- 上传按钮 -->
      <slot name="button">
        <div @click="clickUpload">
          <div v-if="fileType === 'picture'" class="upload-button-image">
            <img v-if="currentImageUrl" :src="currentImageUrl" />
            <div v-else>
              <span class="el-icon-plus"></span>
            </div>
          </div>
          <div v-else>
            <div class="el-icon-upload upload-button-text">上传文件</div>
          </div>
        </div>
      </slot>

      <!-- 图片遮罩 -->
      <div
        v-if="currentImageUrl"
        class="upload-mask"
        @click.self="disabledOpt(true)"
      >
        <span
          class="el-icon-delete pointer sg-box-mr10"
          @click.stop="deleteFile"
        ></span>
        <span @click.self="disabledOpt(true)">|</span>
        <span
          class="el-icon-edit pointer sg-box-ml10"
          @click.self="disabledOpt(false)"
        ></span>
      </div>
    </el-upload>
    <slot name="tip"></slot>
  </div>
</template>
<script>
import * as API from '@/api/api.file.js';
import lrz from 'lrz'; //压缩图片插件

export default {
  props: {
    value: String, //文件fileId
    size: {
      type: Number,
      default: 1024, //文件允许的最大体积，单位:M
    },
    model: {
      type: Array, //已有文件数据,形如[{fileUrl:"",fileId:""}]
      default() {
        return [];
      },
    },
    accept: {
      type: String, //文件格式
      default:
        '.txt,.ppt,.pptx,.doc,.docx,.pdf,.zip,.rar,.xlsx,.xls,.png,.jpg,.jpeg,.gif,.bmp', //文件格式
    },
    limit: {
      type: Number, //最大允许上传个数
      default: 1,
    },
    multiple: {
      type: Boolean, //是否支持多选文件
      default: false,
    },
    listType: {
      type: String, //文件列表的类型
      default: 'text',
    },
    remote: {
      type: Boolean, //是否上传远程服务器
      default: true,
    },
    disabled: {
      type: Boolean, //是否禁用上传
      default: false,
    },
    showFilelList: {
      type: Boolean, //是否显示上传文件列表
      default: true,
    },
    action: {
      type: String, //上传服务器的接口名
      default: 'uploadFile',
    },
    apiParams: {
      type: Object, //接口参数
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      fileType: 'picture', //上传文件的类型
      fileList: [], //上传的文件列表
      uploadDisabled: this.disabled, //是否禁用上传
      compressable: false, //是否压缩图片
      currentImageUrl: '', //当前展示的图片地址
    };
  },
  watch: {
    accept: {
      handler(newVal) {
        if (
          newVal.toLocaleLowerCase().search(/\.(png|jpg|jpeg|gif|bmp)$/) > -1
        ) {
          this.fileType = 'text';
        } else {
          this.fileType = 'text';
        }
      },
      immediate: true,
    },
    fileList(newVal) {
      if (!newVal.length) {
        this.currentImageUrl = '';
        return false;
      }
      if (this.fileType === 'picture') {
        if (newVal[newVal.length - 1].fileUrl) {
          this.currentImageUrl = newVal[newVal.length - 1].fileUrl;
        }
      }
      if (newVal[0].fileId) {
        this.$emit('input', newVal[0].fileId);
      }
      this.$emit('getFiles', newVal);
    },
    model: {
      handler(newVal) {
        if (!newVal) return false;
        if (newVal.length) {
          this.fileList = JSON.parse(JSON.stringify(newVal));
        } else {
          this.fileList = [];
        }
      },
      deep: true,
      immediate: true,
    },
    disabled(newVal) {
      this.uploadDisabled = newVal;
    },
  },
  mounted() {},
  methods: {
    clickUpload() {
      // 打开上传窗口之前，点击按钮事件
      this.$emit('click');
    },
    handleExceed() {
      this.$message.warning(`最多允许上传${this.limit}个文件`);
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    async fileChange(file, fileList) {
      if (!this.preCheckFile(file)) return false;
      if (this.remote) {
        const resData = await this.remoteUploadFile(file);
        if (resData) {
          // 此处需根据后台返回字段进行配置
          file.fileId = String(resData);
        } else {
          this.fileList = [];
          return false;
        }
      } else {
        file.fileUrl = URL.createObjectURL(file.raw);
      }
      this.fileList = fileList.slice(-this.limit);
    },
    // 上传文件校验
    preCheckFile(file) {
      const formats = this.accept.toLocaleLowerCase().split(',');
      const rightFile = formats.some((e) => {
        return file.raw.name.toLocaleLowerCase().search(e);
      });
      if (!rightFile) {
        this.$message({ message: '文件格式不正确', type: 'warning' });
        return false;
      }
      if (file.raw.size / 1024 / 1024 > this.size) {
        this.$message({
          message: `文件大小不能超过${this.size}M`,
          type: 'warning',
        });
        return false;
      }
      return true;
    },
    //上传远程服务器
    async remoteUploadFile(file) {
      if (!file.raw) return false;
      let compressFormData = await this.compressImageOpt(file);
      let formData = compressFormData || new FormData();
      formData.append('file', file.raw);
      if (Object.keys(this.apiParams).length) {
        for (let key in this.apiParams) {
          formData.append(key, this.apiParams[key]);
        }
      }
      const response = await API[this.action](formData);
      if (response && response.code === 200) {
        return response.data;
      } else {
        return false;
      }
    },
    // 压缩图片
    async compressImageOpt(file) {
      if (this.fileType !== 'picture') return false;
      if (!this.compressable) return false;
      if (Math.ceil(file.raw.size / 1024 / 1024) <= 1) return false;
      const File = file.raw;
      if (File.type.search(/png|jpg|jpeg|bmp$/) > -1) {
        const res = await lrz(File, { fieldName: 'file' });
        if (res && res.formData) {
          return res.formData;
        } else {
          return false;
        }
      }
    },
    disabledOpt(disabled) {
      this.uploadDisabled = disabled;
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
    height: 40px;
    line-height: 40px;
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
    animation: show 1s linear forwards;
  }
}
@keyframes show {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>