// 全局注册自定义指令
import Vue from 'vue'
// 防止按钮重复点击
Vue.directive('oneClick', {
  inserted(el) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        el.style.cursor = 'not-allowed'
        setTimeout(() => {
          el.style.cursor = 'pointer'
          el.disabled = false
        }, 2000)
      }
    })
  }
})
// 数据操作权限
Vue.directive('allow', {
  inserted(el, binding, vnode) {
    if (vnode.context.$route.meta.permission) {
      let permissionList = vnode.context.$route.meta.permission;
      if (!permissionList.includes(binding.value)) {
        el.parentNode.removeChild(el)
      }
    }
  }
})
// 下拉框加载更多
Vue.directive('loadmore', {
  bind(el, binding) {
    const dom = el;
    dom.addEventListener('scroll', () => {
      const CONDITION = dom.scrollHeight - dom.scrollTop <= dom.clientHeight
      if (CONDITION) {
        binding.value();
      }
    })
  }
})
// 实现文字溢出省略显示信息提示（ps:copy自网上资料）
Vue.directive('showTips', {
  inserted(el) {
    // 内容是直接在标签中写死的，或指令使用在v-for中，则是通过inserted监测
    createToolTips(el);
  },
  componentUpdated(el) {
    // 内容通过data定义变量获得，所在组件有更新就会触发，特别是有v-model的输入框，会不断地重复调用
    createToolTips(el);
  },
  // 指令与元素解绑时
  unbind() {
    // 移除tootipDom
    const toolTipDom = document.getElementById("iot-tooltip");
    toolTipDom && document.body.removeChild(toolTipDom);
  }
})
const createToolTips = (el) => {
  const curStyle = window.getComputedStyle(el); //获取当前元素最终style
  const textSpan = document.createElement("span"); //创建一个容器来记录文字的width
  // 设置比较容器的字体样式，保证与当前需要省略的样式相同
  textSpan.style.fontSize = curStyle.fontSize;
  textSpan.style.fontWeight = curStyle.fontWeight;
  textSpan.style.fontFamily = curStyle.fontFamily;
  textSpan.innerHTML = el.innerText;
  // 将容器插入body,如果不插入，offsetWidth为0
  document.body.appendChild(textSpan);
  // 判断是否溢出，需要省略隐藏
  if (textSpan.offsetWidth > el.offsetWidth) {
    // 给当前元素设置省略隐藏
    el.style.overflow = "hidden";
    el.style.textOverflow = "ellipsis";
    el.style.whiteSpace = "nowrap";
    // 添加鼠标事件，ps:componentUpdated中会重复调用，如果使用addEventListener,则会重复添加相同事件
    el.onmouseover = MouseEnterEvent;
    el.onmouseout = MouseleaveEvent;
  }
  // 记得移除创建的记录文字真实宽度的容器
  document.body.removeChild(textSpan);

  function MouseEnterEvent(e) {
    // 创建tooltip元素并设置样式
    let toolTipDom = document.createElement("div");
    toolTipDom.style.cssText = `
          max-width:400px;
          max-height: 400px;
          overflow: auto;
          position:absolute;
          top:${e.clientY + 5}px;
          left:${e.clientX}px;
          background: rgba(0, 0 , 0, .6);
          color:#fff;
          border-radius:5px;
          padding:10px;
          display:inline-block;
          font-size:12px;
          z-index:19999
      `;
    // 设置id方便查找
    toolTipDom.setAttribute("id", "iot-tooltip");
    document.body.appendChild(toolTipDom);
    // tooltip中的文字
    toolTipDom.innerText = el.innerText;
  }

  function MouseleaveEvent() {
    // 移除tootipDom
    const toolTipDom = document.getElementById("iot-tooltip");
    toolTipDom && document.body.removeChild(toolTipDom);
  }
}