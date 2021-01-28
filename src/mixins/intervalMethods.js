import { TableScrollAnimation } from '@/assets/js/utils/TableScrollAnimation.js'
export const intervalMixin = {
  data () {
    return {}
  },
  mounted () {},
  methods: {
    /**
     *列表数据设置垂直无缝滚动（二）-->js 操作
     *
     * @param {*} dom 列表数据所有项的父元素
     * @param {*} data 列表数据
     */
    addTableScrollAnimation (dom, data) {
      const tableHeight = dom.offsetHeight
      const FHeight = dom.parentNode.offsetHeight
      // 如果数据高度不足，既不需要滚动展示
      if (tableHeight < FHeight) return
      // 开启动画
      let AnimationClass = new TableScrollAnimation(dom, data)
      AnimationClass.start()
      // 添加事件
      dom.parentNode.onmouseenter = MouseEnterEvent
      dom.parentNode.onmouseleave = MouseleaveEvent
      // 组件销毁时取消动画
      this.$once('hook:beforeDestroy', () => {
        AnimationClass.cancel()
      })

      function MouseEnterEvent () {
        AnimationClass.cancel()
        dom.parentNode.style.overflow = 'auto'
        const translateH = dom.style.transform.replace(/[^\d+|.]/gi, '')
        if (Number(translateH)) {
          dom.style.transform = `translateY(-0px)`
          dom.parentNode.scrollTop += Number(translateH)
        }
      }
      function MouseleaveEvent () {
        dom.parentNode.style.overflow = 'hidden'
        if (isScrollBottom()) {
          const firstItem = dom.children[0]
          dom.removeChild(firstItem)
          dom.appendChild(firstItem)
        }
        setTimeout(() => {
          AnimationClass.moveHeight = 0
          AnimationClass.start()
        }, 200)
      }
      function isScrollBottom () {
        const isToBottom =
          dom.parentNode.scrollHeight - dom.parentNode.scrollTop <=
          dom.parentNode.clientHeight
        return isToBottom
      }
    },
    /**
     *列表数据，使用css3设置无缝循环滚动效果
     * 核心是要克隆一份列表数据
     * ps:列表数据必须放在一个div下，div外面再套一个父节点div即是设置animation的，即传参dom
     * 克隆一份列表数据div，并挂在animation下
     * 传参dom的父节点即是视窗节点
     * ps:注意列表数据的dom节点宽高间距的设置，如果用margin进行间隔，可能不会无缝衔接出现停顿
     * @param {*} dom
     * @param {string} [animationName='tableMove']
     * @param {boolean} [copy=true] // 是否需要自动复制，考虑会出现异步加载，此时可以直接传入复制好的dom
     * @returns
     */
    setCssAnimation (dom, animationName = 'tableMove', copy = true) {
      if (!dom) return false
      const tableHeight = Number(
        window.getComputedStyle(dom.children[0]).height.replace('px', '')
      )
      const FHeight = Number(
        window.getComputedStyle(dom.parentNode).height.replace('px', '')
      )
      let steps = (tableHeight / FHeight).toFixed(2)
      const durationTime = Number(steps) * 10
      // 如果有自定义的style,先删除
      const style = document.getElementById(animationName)
      if (style) {
        style.remove()
      }
      // 如果数据高度不足，既不需要滚动展示
      if (tableHeight < FHeight) {
        return false
      }
      // dom下只会有一个子节点，有两个说明已经copy过一次，需要删除
      if (copy) {
        if (dom.children.length > 1) {
          for (let i = dom.children.length - 1; i >= 0; i--) {
            if (i > 0) {
              dom.removeChild(dom.children[i])
            }
          }
        }
        const copyDom = dom.children[0].cloneNode(true)
        dom.appendChild(copyDom)
      }
      dom.style.animationName = animationName
      dom.style.animationDuration = `${durationTime}s`
      dom.style.animationTimingFunction = 'linear'
      dom.style.animationIterationCount = 'infinite'
      addKeyFrames(-tableHeight, animationName)

      function addKeyFrames (height, animationName) {
        // 添加keyframes style标签
        let style = document.createElement('style')
        style.type = 'text/css'
        style.id = animationName
        let keyFrame = `
        @keyframes ${animationName} {
          0% {
            transform: translateY(0);
          }
          100%{
            transform: translateY(${height}px);
          }
        }`
        style.innerHTML = keyFrame
        document.getElementsByTagName('head')[0].appendChild(style)
      }
    },
    addTimeoutEvent (func, timerId, time = 180000) {
      if (timerId) {
        clearTimeout(timerId)
        timerId = null
      }
      timerId = setTimeout(() => {
        func()
      }, time)
      this.$once('hook:beforeDestroy', () => {
        timerId && clearTimeout(timerId)
      })
    },
    addTimeInterValEvent (tableData, timerId, time = 2000) {
      if (!tableData.length) return false
      if (timerId) {
        clearInterval(timerId)
        timerId = null
      }
      timerId = setInterval(() => {
        const firstItem = tableData.shift()
        tableData.push(firstItem)
      }, time)
      this.$once('hook:beforeDestroy', () => {
        timerId && clearInterval(timerId)
      })
    }
  }
}
