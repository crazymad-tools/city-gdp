import ToolCommon from '../ToolCommon';
import ViewerService from '@/service/ViewerService';

const viewModel = {
  show: false,
  glowOnly: false,
  contrast: 30,
  brightness: -0.3,
  delta: 1.0,
  sigma: 3.78,
  stepSize: 5.0
};

ViewerService.getViewerPromise().then((viewer: any) => {
   viewer = ViewerService.viewer;
  let bloom = viewer.scene.postProcessStages.bloom;
  bloom.enabled = Boolean(viewModel.show);
  bloom.uniforms.glowOnly = Boolean(viewModel.glowOnly);
  bloom.uniforms.contrast = Number(viewModel.contrast);
  bloom.uniforms.brightness = Number(viewModel.brightness);
  bloom.uniforms.delta = Number(viewModel.delta);
  bloom.uniforms.sigma = Number(viewModel.sigma);
  bloom.uniforms.stepSize = Number(viewModel.stepSize)
});

class Bloom extends ToolCommon {
  enable() {
    viewModel.show = true;

    let viewer = ViewerService.viewer;
    let bloom = viewer.scene.postProcessStages.bloom;
    bloom.enabled = Boolean(viewModel.show);
  }

  disable() {
    viewModel.show = false;

    let viewer = ViewerService.viewer;
    let bloom = viewer.scene.postProcessStages.bloom;
    bloom.enabled = Boolean(viewModel.show);
  }
}

export default new Bloom();
