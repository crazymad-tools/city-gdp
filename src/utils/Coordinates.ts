export default class {
  static move (origin: any, offset: number[]) {
    let matrix = Cesium.Transforms.eastNorthUpToFixedFrame(origin);
    matrix[3] = origin.x;
    matrix[7] = origin.y;
    matrix[11] = origin.z;
    let c3s = Cesium.Matrix4.multiplyByPoint(
        matrix,
        new Cesium.Cartesian3(offset[0], offset[1], offset[2]),
        new Cesium.Cartesian3(),
    );

    return c3s;
  }

  static c3sToRadians(position: any) {
    let cartographic = Cesium.Cartographic.fromCartesian(position);
    let {longitude, latitude, height} = cartographic;
    return {
      longitude,
      latitude,
      height
    }
  }

  static c3sToDegrees(position: any) {
    let radians = this.c3sToRadians(position);
    let longitude = Cesium.Math.toDegrees(radians.longitude);
    let latitude = Cesium.Math.toDegrees(radians.latitude);

    return {
      longitude,
      latitude,
      height: radians.height
    }
  }
}
