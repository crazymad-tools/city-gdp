import React, { useState, useEffect, useRef } from 'react';
import Options from './options';
import './index.scss';

interface Props {
  defaultValue?: string;
  onChange?: Function;
  style?: any;
}

const Select: React.FC<Props> = props => {
  const [value, setValue] = useState<string>('');
  const [key, setKey] = useState<any>('');
  const [children, setChildren] = useState<any[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const currentRef = useRef<any>(null);

  useEffect(() => {
    setChildren(React.Children.map(props.children, (child: any) => {
      if (child.props.value === props.defaultValue) {
        setKey(child.props.children);
      }
      return React.cloneElement(child, { onChange: change.bind(null, child.props.onChange) });
    }));
  }, [props.children]);

  useEffect(() => {
    props.defaultValue && setValue(props.defaultValue);
  }, [props.defaultValue]);

  function change(onChange: Function, value: string, children: any) {
    setKey(children);
    setValue(value);
    onChange && onChange(value);
    props.onChange && props.onChange(value);
  }

  return (
    <>
      <div className="select" ref={currentRef} onClick={e => setShow(!show)} style={props.style}>
        <span >{key}</span>
        <span className="iconfont gdp-down" style={{ transition: '0.3s', transform: `rotate(${show ? 0 : 180}deg)` }} />
        <Options parent={currentRef} show={show}>
          {children}
        </Options>
      </div>
    </>
  )
}

export default Select;
