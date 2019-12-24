import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import DOM from '../../../../utils/Dom';
import './index.scss';

interface Props {
  parent: any;
  show: boolean;
}

const SelectOptions: React.FC<Props> = props => {
  const currentRef = useRef<any>(null);

  useEffect(() => {
    if (props.show) {
      let { left, top, width, height } = DOM.getOffset(props.parent.current);
      currentRef.current.style.left = `${left}px`;
      currentRef.current.style.top = `${top + height + 10}px`;
      currentRef.current.style.minWidth = `${width}px`;
      currentRef.current.classList.add('show');
    } else {
      currentRef.current.classList.remove('show');
    }
  }, [props.show]);

  return ReactDOM.createPortal(
    <div className="select-options" ref={currentRef}>
      {props.children}
    </div>,
    document.body
  );
}

export default SelectOptions;
