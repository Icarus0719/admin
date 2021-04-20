/**
 *列表数据，使用css3设置无缝循环滚动效果
 * 核心是要克隆一份列表数据
 * ps:列表数据必须放在一个div下，div外面再套一个父节点div即是设置animation的，即传参dom
 * 克隆一份列表数据div，并挂在animation下
 * 传参dom的父节点即是视窗节点
 * ps:注意列表数据的dom节点宽高间距的设置，如果用margin进行间隔，首尾会出现停顿
 * @param {*} dom
 * @param {string} [animationName='tableMove']
 * @param {boolean} [copy=true] // 是否需要自动复制，考虑会出现异步加载，此时可以直接传入复制好的dom
 */
export const setScrollAnimationByCSS = (
  dom,
  animationName = 'tableMove',
  copy = true
) => {
  if (!dom) return false;
  const tableHeight = Number(
    window.getComputedStyle(dom.children[0]).height.replace('px', '')
  );
  const FHeight = Number(
    window.getComputedStyle(dom.parentNode).height.replace('px', '')
  );
  let steps = (tableHeight / FHeight).toFixed(2);
  const durationTime = Number(steps) * 10;
  // 如果有自定义的style,先删除
  const style = document.getElementById(animationName);
  if (style) {
    style.remove();
  }
  // 如果数据高度不足，既不需要滚动展示
  if (tableHeight <= FHeight) {
    return false;
  }
  // dom下只会有一个子节点，有两个说明已经copy过一次，需要删除
  if (copy) {
    if (dom.children.length > 1) {
      for (let i = dom.children.length - 1; i >= 0; i--) {
        if (i > 0) {
          dom.removeChild(dom.children[i]);
        }
      }
    }
    const copyDom = dom.children[0].cloneNode(true);
    dom.appendChild(copyDom);
  }
  dom.style.animationName = animationName;
  dom.style.animationDuration = `${durationTime}s`;
  dom.style.animationTimingFunction = 'linear';
  dom.style.animationIterationCount = 'infinite';
  addKeyFrames(-tableHeight, animationName);

  function addKeyFrames(height, animationName) {
    // 添加keyframes style标签
    let style = document.createElement('style');
    style.type = 'text/css';
    style.id = animationName;
    let keyFrame = `
        @keyframes ${animationName} {
          0% {
            transform: translateY(0);
          }
          100%{
            transform: translateY(${height}px);
          }
        }`;
    style.innerHTML = keyFrame;
    document.getElementsByTagName('head')[0].appendChild(style);
  }
};

/**
 *
 *
 * @param {*} fdom 所有列表数据的父元素
 * @param {*} data 列表数据
 * @param {*} step 移动距离，默认0.5，越大滚动的越快
 * 核心思想：通过requestAnimationFrame实现translateY的变化，
 * 当translateY等于第一行高度时，第一行就自动切换至末尾，实现无缝循环的效果
 * PS：
 * 1、dom结构是三级，第一级是视图viewdom，需设置overflow：hidden的，
 * 第二级是传参fdom，即所有列表数据的父元素，第三级是各列表项；
 * 2、调用函数时一定要确保dom渲染完成，否则无法准确获取相关dom的高度，
 * 3、每项也是不能用margin来设置间距，必须保证每项dom是紧邻无间距的，否则会有跳跃感。
 * 4、跳转页面时记得调用cancel(),清除动画
 *
 */
export const setScrollAnimationByJS = function(fdom, data, step = 0.5) {
  let viewDomHeight = fdom.parentNode.offsetHeight;
  let domHeight = fdom.offsetHeight;
  // 如果数据高度不足，既不需要滚动展示
  if (domHeight <= viewDomHeight) return;

  const childrenItemHeight = fdom.children[0].offsetHeight || 0;
  let moveHeight = 0;
  let animationId = 0;
  startMove();
  this.cancel = function() {
    animationId && cancelAnimationFrame(animationId);
  };
  function startMove() {
    moveHeight += step;
    if (moveHeight >= childrenItemHeight) {
      moveHeight = 0;
      const firstItem = data.shift();
      data.push(firstItem);
      fdom.style.transform = 'translateY(0px)';
    }
    fdom.style.transform = `translateY(-${moveHeight}px)`;
    animationId = requestAnimationFrame(startMove);
  }
};
