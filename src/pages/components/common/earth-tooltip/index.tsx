import React, { useState, useEffect } from 'react';
import './index.scss';

interface Props {
  offset: { x: number; y: number };
}

const EarthTooltip: React.FC<Props> = props => {
  return (
    <div
      className="earth-tooltip"
      style={{ left: `${props.offset.x}px`, top: `${props.offset.y}px` }}
    >
      {props.children}
    </div>
  );
};

export default EarthTooltip;
