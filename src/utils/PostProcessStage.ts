export class TestPostProcessStage {
  static draw(viewer: any) {
    // Simple stage to change the color
    let fs = `
      uniform sampler2D colorTexture;
      varying vec2 v_textureCoordinates;
      uniform float scale;
      uniform vec3 offset;
      uniform vec2 center;
      void main() {
          vec4 color = texture2D(colorTexture, v_textureCoordinates);

          float distanceX = v_textureCoordinates.x - center.x;
          float distanceY = v_textureCoordinates.y - center.y;
          float distance = 0.25 - (distanceX * distanceX + distanceY * distanceY);

          vec3 addon = vec3(distance, distance, distance);
          
          gl_FragColor = vec4(color.rgb * scale + offset + addon,  1.0);
      }`;
    // viewer.scene.postProcessStages.add(new Cesium.PostProcessStage({
    //   fragmentShader: fs,
    //   uniforms: {
    //     scale: 1.1,
    //     center: { x: 0.5, y: 0.5 },
    //     offset: function () {
    //       return new Cesium.Cartesian3(0.1, 0.1, 0.1);
    //     },
    //   }
    // }));

    // var viewModel = {
    //   show: true,
    //   glowOnly: false,
    //   contrast: 30,
    //   brightness: -0.3,
    //   delta: 1.0,
    //   sigma: 3.78,
    //   stepSize: 5.0
    // };
    
    // // Cesium.knockout.track(viewModel);
    // // var toolbar = document.getElementById('toolbar');
    // // Cesium.knockout.applyBindings(viewModel, toolbar);
    // // for (var name in viewModel) {
    // //   if (viewModel.hasOwnProperty(name)) {
    // //     Cesium.knockout.getObservable(viewModel, name).subscribe(updatePostProcess);
    // //   }
    // // }

    // function updatePostProcess() {
    //   console.log(viewer.scene.postProcessStages.bloom);
    //   var bloom = viewer.scene.postProcessStages.bloom;
    //   bloom.enabled = Boolean(viewModel.show);
    //   bloom.uniforms.glowOnly = Boolean(viewModel.glowOnly);
    //   bloom.uniforms.contrast = Number(viewModel.contrast);
    //   bloom.uniforms.brightness = Number(viewModel.brightness);
    //   bloom.uniforms.delta = Number(viewModel.delta);
    //   bloom.uniforms.sigma = Number(viewModel.sigma);
    //   bloom.uniforms.stepSize = Number(viewModel.stepSize);
    // }
    // updatePostProcess();
  }
}
