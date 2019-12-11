import ViewerService from '@/service/ViewerService';
import { Color } from 'cesium';

const COLORS = [
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#00ffff',
  '#ffff00',
  '#ff00ff'
]

export default class Vector {
  static init() {
    ViewerService.getViewerPromise().then((viewer: any) => {
      // viewer.dataSources.add(Cesium.GeoJsonDataSource.load('/data/geojson/world/countries.geo.json', {
      //   stroke: Cesium.Color.HOTPINK,
      //   fill: Cesium.Color.PINK,
      //   strokeWidth: 3,
      //   markerSymbol: '?'
      // }));
      Cesium.GeoJsonDataSource.load('/data/geojson/world/countries.geo.json').then((res: any) => {
        let { entities } = res;
        entities.values.forEach((entity: any, index: number) => {
          let red = index % 10;
          let green = index / 10 % 10;
          let blue = index / 100 % 10; 
          console.log(entity.properties);
          viewer.entities.add({
            polyline: {
              positions: entity.polygon.hierarchy._value.positions,
            },
            polygon: {
              hierarchy: entity.polygon.hierarchy._value,
              material: new Cesium.Color(red / 10, green / 10, blue / 10).withAlpha(0.6),
              classificationType: Cesium.ClassificationType.BOTH,
              // fill: true,
              // outline: true,
              // outlineColor: Cesium.Color.fromCssColorString(COLORS[Math.floor(Math.random() * 100 % 6)]),
              // outlineWidth: 2,
            }
          });
        });
      });
    })
  }
}
