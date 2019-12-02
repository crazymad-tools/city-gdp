export default class Dom {
  static getOffset(dom: any) {
    let parent: any = dom;
    let left: number = 0;
    let top: number = 0;
    while (parent) {
      left += parent.offsetLeft;
      top += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return {
      left, top, 
      width: dom.offsetWidth,
      height: dom.offsetHeight
    };
  }
}