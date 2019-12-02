import ViewerService from '@/service/ViewerService';

class Path {
  /**
   * 状态,是否正在路径绘制中
   */
  status: boolean = false;

  entities: any[] = [];

  static handler: any;

  private _drawPoint(position: any) {
    let point = ViewerService.viewer.entities.add({
      position: position,
      point: {
        pixelSize: 8,
        color: Cesium.Color.DODGERBLUE,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2
      }
    });
    this.entities.push(point);
  }

  private _toggleMouse() {
    if (this.status) {
      let viewerContainers: any = document.getElementsByClassName('cesium-viewer');
      for (let dom of viewerContainers) {
        dom.style.cursor = 'crosshair';
      }
    } else {
      let viewerContainers: any = document.getElementsByClassName('cesium-viewer');
      for (let dom of viewerContainers) {
        dom.style.cursor = 'default';
      }
    }
  }

  private _start() {
    this.status = true;
    this._toggleMouse();
  }

  private _end() {
    this.status = false;
    this._toggleMouse();
    Path.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    Path.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    Path.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }

  point(finish: Function) {
    if (!Path.handler) return;

    this._start();
    Path.handler.setInputAction((event: any) => {
      let position = ViewerService.viewer.scene.camera.pickEllipsoid(event.position);
      this._drawPoint(position);
      this._end();
      finish(position);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  line(viewer: any, options: {
    finish?: Function,
    step?: Function,
    cancel?: Function
  }) {
    if (!Path.handler) return;

    this._start();
    let positions: any[] = [];
    let movePositions: any[] = [];
    let entity: any = viewer.entities.add({
      polyline: {
        positions: new Cesium.CallbackProperty(() => {
          return movePositions;
        }),
        width: 5,
        material: Cesium.Color.RED
      }
    })
    Path.handler.setInputAction((event: any) => {
      let position = ViewerService.viewer.scene.camera.pickEllipsoid(event.position);
      positions.push(position);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    Path.handler.setInputAction((event: any) => {
      // let position = ViewerService.viewer.scene.camera.pickEllipsoid(event.position);
      // positions.push(position);
      positions.pop();
      options.finish && options.finish(positions);
      this._end();
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK );
    Path.handler.setInputAction((movement: any) => {
      let position = ViewerService.viewer.scene.camera.pickEllipsoid(movement.endPosition);
      movePositions = positions.concat([position]);
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }

  area() {
    if (!Path.handler) return;

    this._start();
  }

  /**
   * 清空绘制的实体并退出路径绘制
   */
  clear() {
    this._end();
    this.clearEntity();
  }

  clearEntity () {
    for (let entity of this.entities) {
      ViewerService.viewer.entities.remove(entity);
    }
    this.entities = [];
  }

}

ViewerService.getViewerPromise().then((viewer: any) => {
  Path.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
});

export default new Path();
