import React, { useEffect, useRef } from 'react';
import ViewerService from '@/service/ViewerService';
import { RotatePolygon, CityPoint, DashLine, CapitalStar, Cylinder } from '@/utils/Primtive';
import ModeController from '@/service/ModeController';
import MapSelector from './map-selector';

export default function() {
  useEffect(() => {
    let hangzhou = [120.1339175880, 30.2954409479];
    let shanghai = [121.5328037588, 31.1816555919];
    let wenzhou = [120.6259214248, 28.0187203619];
    ViewerService.init('map');
    // Cylinder.draw(ViewerService.viewer);
    // ModeController.init();
    RotatePolygon.draw(ViewerService.viewer, hangzhou);
    RotatePolygon.draw(ViewerService.viewer, shanghai);
    DashLine.draw(ViewerService.viewer, [
      120.4266488487, 30.1582085812,
      120.7397406729, 29.9882477904,
      121.1901900608, 29.9716011316
    ]);
    CityPoint.draw(ViewerService.viewer, wenzhou);
    CapitalStar.draw(ViewerService.viewer, [
      121.6239600329, 29.8585075419
    ], {
      x: 1000,
      y: 1000,
    });
  }, []); 

  return (
    <>
      <div id="map"></div>
      <MapSelector />
    </>
  );
}
