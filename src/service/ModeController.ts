import ViewerService from './ViewerService';

export default class ModeController {

  static init() {
    let last = 80000;
    let lastPos: any = null;
    let update = () => {
      let viewer = ViewerService.viewer;
      if (viewer) {
        // let cartographic = Cesium.Cartographic.fromCartesian(viewer.camera.position);
        // let { longitude, latitude, height } = cartographic;
        // lastPos = cartograsphic;

        // longitude = Cesium.Math.toDegrees(longitude);
        // latitude = Cesium.Math.toDegrees(latitude);
        if (viewer.camera.positionCartographic.height <= 3000 && (last > 3000 || last === -1)) {
          this.toggle3D();
        } else if (
          viewer.camera.positionCartographic.height > 5000 &&
          (last <= 5000 || last === -1)
        ) {
          this.toggle2D();
        }
      }
      lastPos = {
        x: viewer.camera.position.x,
        y: viewer.camera.position.y,
        z: viewer.camera.position.z
      };
      last = viewer.camera.positionCartographic.height;
      Cesium.requestAnimationFrame(update);
    };
    Cesium.requestAnimationFrame(update);
  }

  static toggle2D() {
    let viewer: any = ViewerService.viewer;
    let camera: any = viewer.camera;
    viewer.scene.screenSpaceCameraController.enableTilt = false;

    let cartographic = Cesium.Cartographic.fromCartesian(viewer.camera.position);
    let { height } = cartographic;
    let windowPos = {
      x: viewer.scene.canvas.width / 2,
      y: viewer.scene.canvas.height / 2,
    };
    let center = viewer.scene.camera.pickEllipsoid(windowPos);
    center = Cesium.Cartographic.fromCartesian(center);
    let { longitude, latitude } = center;
    center = Cesium.Cartesian3.fromRadians(longitude, latitude, height);
    let options = {
      destination: center,
      duration: 1,
      orientation: {
        heading: Cesium.Math.toRadians(360),
        pitch: Cesium.Math.toRadians(-90),
        roll: camera.roll,
      },
    };
    if (
      Math.abs(camera.heading - Cesium.Math.toRadians(360)) < Math.PI / 60 &&
      Math.abs(camera.pitch - Cesium.Math.toRadians(-90)) < Math.PI / 60
    ) {
      viewer.camera.setView(options);
    } else {
      viewer.camera.flyTo(options);
    }

    viewer.imageryLayers.raiseToTop(ViewerService.tdtdMap);
  }

  static toggle3D() {
    let viewer: any = ViewerService.viewer;
    viewer.scene.screenSpaceCameraController.enableTilt = true;
    viewer.imageryLayers.raiseToTop(ViewerService.googleMap);
  }
}
