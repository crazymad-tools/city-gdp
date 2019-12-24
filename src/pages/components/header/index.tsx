import React from 'react';
// import { Select, SelectOption } from 'src/pages/components/common';
import { Select, SelectOption } from '../common';
import VectorService from '../../../service/VectorService';
import './index.scss';

interface Props { }

const Header: React.FC<Props> = props => {

  function loadGeojson (url: string) {
    VectorService.load(url);
  }

  return (
    <>
      <header>
        {/* <span className="header-title">
          CITY<span className="header-title-decorate">GDP</span>
        </span> */}
        {/* <select defaultValue="">
          <option>杭州</option>
          <option>世界</option>
        </select> */}
        <Select defaultValue="hello" style={{ width: '100px' }} onChange={loadGeojson}>
          <SelectOption value="/data/geojson/hangzhou-city.geojson">杭州市区</SelectOption>
          <SelectOption value="/data/geojson/world/countries.geo.json">世界各国</SelectOption>
        </Select>
      </header>
    </>
  );
};

export default Header;
