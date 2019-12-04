import ToolCommon from '../ToolCommon';
import Path from '@/utils/Path';
import ViewerService from '@/service/ViewerService';

class Area extends ToolCommon {
  enable () {
    Path.area(ViewerService.viewer, {});
  }
} 

export default new Area();
