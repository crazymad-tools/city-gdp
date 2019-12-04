import React, { useEffect, useState, useRef } from 'react';
import Dom from '@/utils/Dom';
import './index.scss';

interface Props {
  content: string;
  direction: string;
  delay: number;
}

let intimer: any = null;
let begin: number = 0;
let tipdom: any = null;
let current: any = null;

const Tooltip: React.FC<Props> = props => {
  useEffect(() => {
    if (intimer) {
      clearTimeout(intimer);
      intimer = setTimeout(() => {
        show();
        intimer = null;
      }, props.delay - (new Date().getTime() - begin));
    }
  });

  /**
   * 鼠标划出
   */
  function mouseOut() {
    hide();
    current = null;
    clearTimeout(intimer);
    intimer = null;
  }

  /**
   * 鼠标划入
   */
  function mouseIn(e: any) {
    current = e.currentTarget;
    intimer = setTimeout(() => {
      show();
      intimer = null;
    }, props.delay);
  }

  /**
   * 显示tooltip
   */
  function show() {
    if (tipdom || !current) return;

    if (!tipdom) {
      tipdom = document.createElement('pre');
      tipdom.classList.add('cm-tooltip');
      document.body.appendChild(tipdom);
    }

    // 获取目标dom距离窗口边界距离
    let { left, top, width, height } = Dom.getOffset(current);
    tipdom.innerText = props.content;
    if (props.direction === 'top') {
      tipdom.style.left = `${left + width / 2}px`;
      tipdom.style.top = `${top - 10}px`;
      tipdom.classList.add('top');
    } else if (props.direction === 'bottom') {
      tipdom.style.left = `${left + width / 2}px`;
      tipdom.style.top = `${top + height + 10}px`;
      tipdom.classList.add('bottom');
    } else if (props.direction === 'left') {
      tipdom.style.right = `${document.body.clientWidth - left + 10}px`;
      tipdom.style.top = `${top + height / 2}px`;
      tipdom.classList.add('left');
    } else if (props.direction === 'right') {
      tipdom.style.left = `${left + width + 10}px`;
      tipdom.style.top = `${top + height / 2}px`;
      tipdom.classList.add('right');
    }
    // setTimeout(() => {
      // console.log(tipdom.style.transform);
      // tipdom.style.transform = tipdom.style.transform.replace('scale(0)', 'scale(1)');
      // tipdom && console.log(tipdom.style.webkitTransform);
    // }, 1000);
  }

  /**
   * 隐藏tooltip
   */
  function hide() {
    tipdom && document.body.removeChild(tipdom);
    tipdom = null;
  }

  return (
    <>
      {React.Children.map(props.children, (child: any) => {
        return React.cloneElement(child, {
          className: child.props.className + ' tooltip-wrap-content',
          onMouseEnter: mouseIn,
          onMouseLeave: mouseOut
        });
      })}
    </>
  );
};

Tooltip.defaultProps = {
  delay: 0,
};

export default Tooltip;
