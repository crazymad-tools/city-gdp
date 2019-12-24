import ViewerService from '@/service/ViewerService';

export default class Vector {
  static entities: any[] = [];
  static currentLayer: string = '';

  static init() {}

  static load(url: string) {
    let viewer = ViewerService.viewer;

    this.entities.forEach((entity: any) => {
      viewer.entities.remove(entity);
    });
    this.entities = [];

    Cesium.GeoJsonDataSource.load(url).then((res: any) => {
      let { entities } = res;
      entities.values.forEach((entity: any, index: number) => {
        let red = Math.random();
        let green = Math.random();
        let blue = Math.random();
        this.entities.push(
          viewer.entities.add({
            polyline: {
              positions: entity.polygon.hierarchy._value.positions,
            },
            polygon: {
              hierarchy: entity.polygon.hierarchy._value,
              material: new Cesium.Color(red, green, blue).withAlpha(0.3),
              classificationType: Cesium.ClassificationType.BOTH,
            },
          }),
        );
      });
    });
  }
}
