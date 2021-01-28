/*
 * @Author: 操作PC/IOS/Android设备API
 * @Date: 2020-07-22 17:11:21 
 * @Last Modified time: 2020-07-22 17:11:46
 */

/**
 * @method isPC pc or 移动端判断
 */
export const isPC = () => {
  if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    return false
  } else {
    return true
  }
}
/**
 *ios13 调取动作和方向权限
 *
 */
export const ios13granted = () => {
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === "granted") {
          window.addEventListener("devicemotion", () => {});
        }
      })
      .catch(err => {
        alert(err);
      });
  } else {
    console.log("非ios13+设备处理");
  }
}

/**
 * 获取设备媒体音量信息
 * @method watchMediaVoice 
 * @param {*} callback --回调函数
 */
export const watchMediaVoice = (callback) => {
  let tips = document.createElement("p");
  tips.style.cssText = `
        position: fixed;
        text-align: center;
        background: rgba(0,0,0,0.5);
        line-height: 30px;
        z-index: 99999;
        top:0;
        left: 50%;
        transform: translateX(-50%);
        padding: 0 10px;
        color: #fff;
      `;
  tips.setAttribute("id", "snap-tip");
  document.body.appendChild(tips);
  let audioContext = new(window.AudioContext || window.webkitAudioContext)();
  let mediaStreamSource = null;
  let scriptProcessor = null;
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // 获取用户的 media 信息
    navigator.mediaDevices
      .getUserMedia({
        audio: true
      })
      .then(stream => {
        tips.innerHTML = "靠近麦克风打个响指试试"

        // 将麦克风的声音输入这个对象
        mediaStreamSource = audioContext.createMediaStreamSource(stream);

        // 创建一个音频分析对象，采样的缓冲区大小为4096，输入和输出都是单声道
        scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);
        // 将该分析对象与麦克风音频进行连接
        mediaStreamSource.connect(scriptProcessor);
        // 此举无甚效果，仅仅是因为解决 Chrome 自身的 bug
        scriptProcessor.connect(audioContext.destination);
        // 开始处理音频
        scriptProcessor.onaudioprocess = e => {
          // 获得缓冲区的输入音频，转换为包含了PCM通道数据的32位浮点数组
          const buffer = e.inputBuffer.getChannelData(0);
          // 获取缓冲区中最大的音量值
          const maxVal = Math.max.apply(Math, buffer);
          // 显示音量值
          if (maxVal > 0.4) {
            tips.innerHTML = "成功 success";
            tips.style.opacity = 1;
            tips.style.zIndex = 99999;
            setTimeout(() => {
              tips.style.opacity = 0;
              tips.style.zIndex = -1;
            }, 2000)
            callback && callback()
          }
        };
      })
      .catch(error => {
        tips.innerHTML = `获取音频时好像出了点问题，试试点击按钮触发吧<br>${error}`;
        setTimeout(() => {
          tips.style.opacity = 0;
          tips.style.zIndex = -1;
        }, 2000)
      });
  } else {
    alert("不支持获取媒体接口")
  }
}