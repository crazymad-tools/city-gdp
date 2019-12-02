import React, { useEffect, useState } from 'react';
import './index.scss';

interface Props {
  content: string;
  direction: string;
  delay: number;
}

let timer: any = null;
let begin: number = 0;

const Tooltip: React.FC<Props> = props => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log('划出');
        timer = null;
      }, props.delay - (new Date().getTime() - begin));
    }
  });

  useEffect(() => {
    // console.log(props.children);
  }, []);

  function mouseout() {
    setVisible(false);
    timer = null;
    clearTimeout(timer);
  }

  function mouseIn() {
    timer = setTimeout(() => {
      console.log('划出');
      timer = null;
    }, props.delay);
  }

  return (
    <div
      className={`tooltip${visible ? ' tooltip-show' : ''}`}
      onMouseEnter={mouseIn}
      onMouseLeave={mouseout}
    >
      {props.children}
    </div>
  );
};

Tooltip.defaultProps = {
  delay: 0,
};

export default Tooltip;
