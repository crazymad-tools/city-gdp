import ViewerService from '@/service/ViewerService';

export interface PathEntity {
  path: any[];
  points: any[];
  entity: any;
}

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
        outlineWidth: 2,
        index: 10
      },
      index: 10
    });
    return point;
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
    console.log('start');
    Path.handler.setInputAction((event: any) => {
      let position = ViewerService.viewer.scene.camera.pickEllipsoid(event.position);
      
      finish(position, this._drawPoint(position));
      this._end();
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
        width: 3,
        material: Cesium.Color.WHITE
      }
    });
    Path.handler.setInputAction((event: any) => {
      let position = ViewerService.viewer.scene.camera.pickEllipsoid(event.position);
      if (positions.length > 1 && position.equals(positions[positions.length - 1])) return;
      positions.push(position);
      this._drawPoint(position);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    Path.handler.setInputAction((event: any) => {
      options.finish && options.finish(positions);
      this._end();
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    Path.handler.setInputAction((movement: any) => {
      let position = ViewerService.viewer.scene.camera.pickEllipsoid(movement.endPosition);
      movePositions = positions.concat([position]);
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }

  area(viewer: any, options: {
    finish?: Function,
    step?: Function,
    cancel?: Function
  }) {
    if (!Path.handler) return;

    this._start();
    let positions: any[] = [];
    let movePositions: any[] = [];
    let movePoint: any = viewer.entities.add({
      position: new Cesium.CallbackProperty(() => {
        return movePositions[movePositions.length - 1] ? movePositions[movePositions.length - 1] : null
      }),
      point: {
        pixelSize: 8,
        color: Cesium.Color.DODGERBLUE,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2
      }
    });
    let entity: any = viewer.entities.add({
      polygon: {
        hierarchy: new Cesium.CallbackProperty(() => {
          return new Cesium.PolygonHierarchy(movePositions, [])
        }),
        material: new Cesium.Color(0, 1, 1, 0.6),
        classificationType: Cesium.ClassificationType.BOTH 
      },
      polyline: {
        positions: new Cesium.CallbackProperty(() => {
          return movePositions.concat(movePositions[0] ? [movePositions[0]] : []);
        }),
        width: 3,
        material: Cesium.Color.WHITE,
        // depthFailMaterial: Cesium.Color.WHITE,
        classificationType: Cesium.ClassificationType.BOTH,
        index: 1,
      },
      index: 1
    });
    let points: any[] = [];
    Path.handler.setInputAction((event: any) => {
      let position = ViewerService.viewer.scene.camera.pickEllipsoid(event.position);
      positions.push(position);
      points.push(this._drawPoint(position));
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    Path.handler.setInputAction((event: any) => {
      positions.pop();
      options.finish && options.finish(positions);
      this._end();
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    Path.handler.setInputAction((movement: any) => {
      let position = ViewerService.viewer.scene.camera.pickEllipsoid(movement.endPosition);
      movePositions = positions.concat([position]);
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    Path.handler.setInputAction(() => {
      viewer.entities.remove(movePoint);
      viewer.entities.remove(entity);
      points.forEach((point: any) => {
        viewer.entities.remove(point);
      });
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
  }

  /**
   * 清空绘制的实体并退出路径绘制
   */
  clear() {
    this._end();
    // this.clearEntity();
  }

  clearEntity() {
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
