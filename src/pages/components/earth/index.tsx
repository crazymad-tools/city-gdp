import React, { useEffect, useRef } from 'react';
import ViewerService from '@/service/ViewerService';
import ModeController from '@/service/ModeController';
import { RotatePolygon, CityPoint, DashLine, CapitalStar, Cylinder, Box, Radar, RoadLine } from '@/utils/Primtive';
import { TestPostProcessStage } from '@/utils/PostProcessStage';
import Tooltips from './tooltips';

export default function() {
  useEffect(() => {
    let hangzhou = [120.1339175880, 30.2954409479];
    let shanghai = [121.5328037588, 31.1816555919];
    let wenzhou = [120.6259214248, 28.0187203619];
    ViewerService.init('map');
    // ModeController.init();
    RotatePolygon.draw(ViewerService.viewer, hangzhou);
    // RotatePolygon.draw(ViewerService.viewer, shanghai);
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

    Box.draw(ViewerService.viewer, [120.6239600329, 29.8585075419], '#006699');
    Radar.draw(ViewerService.viewer, [120.7239600329, 29.8585075419], 10000, '#ff0000');
    RoadLine.draw(ViewerService.viewer, '/data/geojson/road.geojson');
    TestPostProcessStage.draw(ViewerService.viewer);
  }, []); 

  return (
    <>
      <div id="map" />
      <Tooltips />
    </>
  );
}
