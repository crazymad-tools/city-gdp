import React, { useEffect, useRef } from 'react';
import ViewerService from '@/service/ViewerService';
import ModeController from '@/service/ModeController';
import { RotatePolygon, CityPoint, DashLine, CapitalStar, Cylinder, Box, Radar, RoadLine } from '@/utils/Primtive';
import { TestPostProcessStage } from '@/utils/PostProcessStage';
import MapService from '@/service/MapService';
import Tooltips from './tooltips';
import VectorService from '@/service/VectorService';

export default function () {
  useEffect(() => {
    // let hangzhou = [120.1339175880, 30.2954409479];
    // let shanghai = [121.5328037588, 31.1816555919];
    // let wenzhou = [120.6259214248, 28.0187203619];
    ViewerService.init('map');
    VectorService.init();
    MapService.switch('google-scene');
    // ViewerService.getViewerPromise().then((viewer: any) => {
    //   let positions: any[] = [];
    //   let lonlats: any[] = [];
    //   let polyline = viewer.entities.add({
    //     polyline: {
    //       positions: positions,
    //       width: 4,
    //       material: Cesium.Color.BLACK,
    //       depthFailMaterial: Cesium.Color.BLACK
    //     }
    //   })
    //   viewer.screenSpaceEventHandler.setInputAction((e: any) => {
    //     let position: any = viewer.scene.pickPosition(e.position);
    //     let cartographic = Cesium.Cartographic.fromCartesian(position);
    //     lonlats.push([
    //       Cesium.Math.toDegrees(cartographic.longitude),
    //       Cesium.Math.toDegrees(cartographic.latitude)
    //     ])

    //     positions.push(position);
    //     polyline.polyline.positions = positions;
    //   }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    //   viewer.screenSpaceEventHandler.setInputAction(() => {
    //     positions.pop();
    //     polyline.polyline.positions = positions;
    //   }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    //   viewer.screenSpaceEventHandler.setInputAction(() => {
    //     positions.pop();
    //     lonlats.pop();
    //     console.log(JSON.stringify(lonlats));
    //   }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    // });
    // ModeController.init();
    // RotatePolygon.draw(ViewerService.viewer, hangzhou);
    // RotatePolygon.draw(ViewerService.viewer, shanghai);
    // DashLine.draw(ViewerService.viewer, [
    //   120.4266488487, 30.1582085812,
    //   120.7397406729, 29.9882477904,
    //   121.1901900608, 29.9716011316
    // ]);
    // CityPoint.draw(ViewerService.viewer, wenzhou);
    // CapitalStar.draw(ViewerService.viewer, [
    //   121.6239600329, 29.8585075419
    // ], {
    //   x: 1000,
    //   y: 1000,
    // });

    // Box.draw(ViewerService.viewer, [120.6239600329, 29.8585075419], '#006699');
    // Radar.draw(ViewerService.viewer, [120.7239600329, 29.8585075419], 10000, '#ff0000');
    // RoadLine.draw(ViewerService.viewer, '/data/geojson/road.geojson');
    // TestPostProcessStage.draw(ViewerService.viewer);
  }, []);

  return (
    <>
      <div id="map" />
      <Tooltips />
    </>
  );
}
