import ToolCommon from '../ToolCommon';
import Path from '@/utils/Path';
import ViewerService from '@/service/ViewerService';

class Distance extends ToolCommon {

  enable () {
    Path.line(ViewerService.viewer, {});
  }

}

export default new Distance();
