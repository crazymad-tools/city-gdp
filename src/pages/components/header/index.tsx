import React from 'react';
import './index.scss';

interface Props {}

const Header: React.FC<Props> = props => {
  return (
    <>
      <header>
        <span className="header-title">
          CITY<span className="header-title-decorate">GDP</span>
        </span>
      </header>
      {/* <div className="left-side"></div> */}
      {/* <div className="right-side"></div> */}
    </>
  );
};

export default Header;
