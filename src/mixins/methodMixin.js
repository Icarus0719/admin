import API from "@/api/api";

export const methodMixin = {
  methods: {
    // 获取完整的url
    async getAsyncFileUrl(fileId) {
      const response = await API.queryFileUrl({
        fileId: fileId
      });
      if (response) return response.data;
    },
    // 获取列表数据中的图片
    getImagesList(list) {
      let [...arr] = list;
      let pros = [];
      arr.length && arr.forEach(e => {
        let item = null;
        if (e.imgUrl) {
          item = this.getAsyncFileUrl(e.imgUrl)
        } else {
          item = Promise.resolve("");
        }
        pros.push(item);
      });
      return Promise.all(pros).then(res => {
        res.forEach((imageUrl, i) => {
          arr[i].fileUrl = imageUrl;
        });
        return arr
      })
    },
  }
}