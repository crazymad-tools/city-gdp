import React, { useEffect, useRef } from 'react';
import Header from './components/header';
import Earth from './components/earth';
import Tool from './components/tool';
import MapSelector from './components/map-selector';
import './index.scss';
import ViewerService from '@/service/ViewerService';

export default function() {
  useEffect(() => {
    
  }, []);

  return (
    <>
      <Header />
      <Tool />
      <MapSelector />
      <Earth />
    </>
  );
}
