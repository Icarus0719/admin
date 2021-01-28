/**
 * @method dragDomByMouseDown 按住鼠标左键拖拽容器
 */
export const dragDomByMouseDown = dom => {
  dom.addEventListener("mousedown", OnMouseDown, false);
  dom.addEventListener("mouseup", () => {
    document.onmousemove = null;
  }, false);

  function OnMouseDown(event) {
    const contentBox = dom;
    //获取鼠标在页面中的位置
    const pageX =
      event.pageX || event.clientX + document.documentElement.scrollLeft;
    const pageY =
      event.pageY || event.clientY + document.documentElement.scrollTop;
    //获取鼠标在按下的那一瞬间在盒子中的位置
    const boxX = pageX - contentBox.offsetLeft;
    const boxY = pageY - contentBox.offsetTop;
    //鼠标在页面上移动 让盒子跟着鼠标移动
    document.onmousemove = event => {
      //获取鼠标在页面上的位置
      const pageX =
        event.pageX || event.clientX + document.documentElement.scrollLeft;
      const pageY =
        event.pageY || event.clientY + document.documentElement.scrollTop;
      //让box跟着鼠标移动
      let moveX = pageX - boxX;
      let moveY = pageY - boxY;
      if (moveX < 0) {
        moveX = 0;
      }
      if (moveX > document.body.clientWidth - contentBox.offsetWidth) {
        moveX = document.body.clientWidth - contentBox.offsetWidth;
      }
      if (moveY < 0) {
        moveY = 0;
      }
      if (moveY > document.body.clientHeight - contentBox.offsetHeight) {
        moveY = document.body.clientHeight - contentBox.offsetHeight;
      }
      contentBox.style.left = moveX + "px";
      contentBox.style.top = moveY + "px";
    };
  }

}