import React from 'react';
import './index.scss';

interface Props {
  onChange?: Function;
  value: string;
}

const SelectOption: React.FC<Props> = props => {
  function change() {
    props.onChange && props.onChange(props.value, props.children);
  }

  return (
    <div className="select-option" onClick={e => change()}>
      {props.children}
    </div>
  )
}

export default SelectOption;
