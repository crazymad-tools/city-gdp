export class RotatePolygon {
  static draw(viewer: any, material?: string) {
    let entity = viewer.entities.add({
      orientation: orientation,
      polygon: {
        hierarchy: new Cesium.PolygonHierarchy(
          Cesium.Cartesian3.fromDegreesArray([
            116.5210032719, 31.8402524920,
            116.6250088037, 31.8402524920,
            116.6250088037, 31.7845083466,
            116.5210032719, 31.7845083466,
          ])
        ),
        // material: material || '/img/main-bg.png'
        material: new Cesium.ImageMaterialProperty({
          image: '/img/main-bg.jpg',
          repeat: new Cesium.Cartesian2(1, 1)
        }),
        stRotation: 0
      }
    });

    let rotation = () => {
      // requestAnimationFrame(rotation);
      let radians = entity.polygon.stRotation._value + 0.01;
      // entity.polygon.stRotation.setValue(radians); 
      // console.log(entity.polygon.stRotation);
    };
    // requestAnimationFrame(rotation);
    setInterval(() => {
      // let radians = entity.polygon.stRotation._value + 0.01;
      var orientation = Cesium.Transforms.headingPitchRollQuaternion(
        Cesium.Cartesian3.fromDegrees(116.5210032719, 31.8402524920),
        Cesium.Math.toRadians(0.0),
        Cesium.Math.toRadians(0.0),
        Cesium.Math.toRadians(90.0)
      );
      // entity.orientation = orientation;
      // entity.polygon.stRotation.setValue(radians);
    }, 100);


    return entity;
  }

}
