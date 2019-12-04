import ToolCommon from '../ToolCommon';
import Path from '@/utils/Path';
import Coordinates from '@/utils/Coordinates';
import ViewerService from '@/service/ViewerService';

class Point extends ToolCommon {
  // entities: any[] = [];

  enable () {
    Path.point((position: any, point: any) => {
      let {longitude, latitude, height} = Coordinates.c3sToDegrees(position);
      let _window: any = window;
      _window.g_app._store.dispatch({
        type: 'earth-tooltip/add',
        payload: {
          tooltip: {
            content: `经度: ${longitude.toFixed(6)}\n纬度: ${latitude.toFixed(6)}\n高度: ${height.toFixed(2)}`,
            type: 'point-coordinate',
            position: position
          } 
        }
      });
      // let entity = ViewerService.viewer.entities.add({
      //   position: Coordinates.move(position, [0, 0, 10]),
      //   label: {
      //     text: `经度: ${longitude.toFixed(6)}\n纬度: ${latitude.toFixed(6)}\n高度: ${height.toFixed(2)}`,
      //     font: '16px sans-serif',
      //     outlineColor: Cesium.Color.BLACK,
      //     outlineWidth: 4,
      //     style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      //     horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      //     verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      //     pixelOffset: new Cesium.Cartesian2(0, -20),
      //   }
      // });
      // this.entities.push(entity);
      this.enable();
    });
  }
  disable () {
    // for (let entity of this.entities) {
    //   ViewerService.viewer.entities.remove(entity);
    // }
    // this.entities = [];
    Path.clear();
  }
}

export default new Point();
