import ToolCommon from '../ToolCommon';
import ViewerService from '@/service/ViewerService';

class Sunlight extends ToolCommon {

  enableLighting: boolean = false;

  shadows: boolean = false;

  enable () { 
    let viewer = ViewerService.viewer;
    this.enableLighting = viewer.scene.globe.enableLighting;
    this.shadows = viewer.shadows;

    viewer.scene.globe.enableLighting = true;
    viewer.shadows = true;
  }

  disable () {
    let viewer = ViewerService.viewer;
    viewer.scene.globe.enableLighting = this.enableLighting;
    viewer.shadows = this.shadows;
  }

}

export default new Sunlight();
