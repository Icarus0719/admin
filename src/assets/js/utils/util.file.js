/**
 * @method dataExport 数据导出
 */
export const dataExport = (data, fileName) => {
  const blobData = new Blob([data]);
  const aLink = document.createElement('a');
  aLink.href = window.URL.createObjectURL(blobData);
  aLink.download = fileName;
  document.body.appendChild(aLink);
  aLink.click();
  window.URL.revokeObjectURL(aLink.href);
  document.body.removeChild(aLink);
}
/**
 * @method dataExportError 导出异常处理，返回错误JSON信息
 */
export const dataExportError = data => {
  return new Promise(resolve => {
    const fr = new FileReader();
    const blob = new Blob([data]);
    fr.readAsText(blob);
    fr.onload = function (e) {
      const responseJSON = JSON.parse(e.target.result);
      resolve(responseJSON);
    };
  })
}
/**
 * @method downLoadFileReName 文件下载跨域重命名
 */
export const downLoadFileReName = (url, fileName) => {
  getBlob(url).then(blob => {
    saveAs(blob, fileName);
  });



  function saveAs(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      const body = document.querySelector('body');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      // fix Firefox
      link.style.display = 'none';
      body.appendChild(link);
      link.click();
      body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    }
  }
}
const getBlob = (url) => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      }
    };
    xhr.send();
  });
}
/**
 * @method loadFile 读取本地文件
 * @param location 文件所在位置
 */
export const loadFile = async location => {
  // let xhr = new XMLHttpRequest(),
  //   okStatus = document.location.protocol === "file:" ? 0 : 200;
  // xhr.open('GET', location, true);
  // // xhr.overrideMimeType("text/html;charset=utf-8"); //默认为utf-8
  // xhr.send(null);
  // return xhr.status === okStatus ? xhr.responseText : null;
  return await getBlob(location)
}