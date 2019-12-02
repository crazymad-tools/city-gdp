import React, { useState } from 'react';
import Tooltip from '@/pages/components/common/tooltip';
import MapService from '@/service/MapService';
import './index.scss';

interface Props {}

interface Map {
  name: string;
  key: string;
  cover: string;
}

const MapSelector: React.FC<Props> = props => {
  const [mapList, setMapList] = useState<Map[]>([
    {
      name: '谷歌卫星地图',
      key: 'google-scene',
      cover: '/img/google-map-cover.png',
    },
    {
      name: '天地图电子地图',
      key: 'tdt-dz',
      cover: '/img/tdt-e-cover.png',
    },
  ]);

  function select(key: string) {
    MapService.switch(key);
  }

  return (
    <div className="map-selector">
      {mapList.map((map: Map, index: number) => (
        <div className="map-option" key={index} onClick={select.bind(null, map.key)}>
          <Tooltip content={map.name} direction="top" delay={500}>
            <img src={map.cover} width="100%" height="100%" />
          </Tooltip>
        </div>
      ))}
      {/* <div className="map-option"></div> */}
    </div>
  );
};

export default MapSelector;
