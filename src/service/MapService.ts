import ViewerService from './ViewerService';

const maps: { [key: string]: any } = {};

export default class MapService {

  static switch(key: string) {
    if (!maps[key]) {
      this.initMap(key);
    }
    maps[key] && ViewerService.viewer.imageryLayers.raiseToTop(maps[key]);
  }

  static initMap(key: string) {
    switch (key) {
      case 'google-scene':
        maps[key] = ViewerService.viewer.imageryLayers.addImageryProvider(
          new Cesium.UrlTemplateImageryProvider({
            url: 'http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali',
          })
        );
        break;
      case 'tdt-dz':
        maps[key] = ViewerService.viewer.imageryLayers.addImageryProvider(
          new Cesium.WebMapTileServiceImageryProvider({
            url: `http://{s}.tianditu.com/vec_w/wmts?tk=aaffda907f90f15f0a1efec9d3569fda&service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles`,
            layer: 'img',
            style: 'default',
            format: 'tiles',
            tileMatrixSetID: 'w',
            subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
            credit: new Cesium.Credit('天地图全球矢量服务'),
            maximumLevel: 18,
          })
        );
        break;
      case 'dark':
        maps[key] = ViewerService.viewer.imageryLayers.addImageryProvider(
          new Cesium.MapboxImageryProvider({
            mapId: 'mapbox.dark',
            accessToken: 'pk.eyJ1IjoiY3JhenltYWQwNjAxIiwiYSI6ImNqd2c0anpjMDE2bG40NG5wZXc5OHgyOHMifQ.Lw8VwGYJnV0xNrBjF5NMOw',
          })
        );
        break;
    }
  }

}