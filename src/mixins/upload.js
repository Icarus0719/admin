import API from '@/api/api';
import lrz from 'lrz'; //压缩图片插件

export const uploadMixin = {
  methods: {
    // 上传图片
    async remoteUploadFile(file) {
      let formData = null;
      const newFile = await this.compressImageOpt(file);
      if (newFile && newFile.formData) {
        formData = newFile.formData;
      } else {
        formData = new FormData();
        formData.append('file', file);
      }
      const response = await API.uploadFile(formData);
      if (response) {
        const resData = response.data;
        file.fileUrl = resData.url;
        file.fileId = resData.fileId;
      }
    },
    // 压缩图片
    async compressImageOpt(file) {
      if (Math.ceil(file.size / 1024 / 1024) <= 1) return false;
      const File = file;
      if (File.type.search(/png|jpg|jpeg|bmp$/) > -1) {
        const res = await lrz(File, { fieldName: 'file' });
        if (res) return res;
      }
    },
  },
};
