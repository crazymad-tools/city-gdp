import Coordinates from '@/utils/Coordinates';

export class RotatePolygon {

  static primitives: any[] = [];

  static draw(viewer: any, coordinates: number[], material?: any) {
    let center = Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1]);
    let leftTop = Coordinates.move(center, [-50000, 50000, 0]);
    let rightBottom = Coordinates.move(center, [50000, -50000, 0]);
    let leftTopLon = Coordinates.c3sToRadians(leftTop);
    let rightBottomLon = Coordinates.c3sToRadians(rightBottom);
    let geometry: any = new Cesium.RectangleGeometry({
      rectangle: new Cesium.Rectangle(
        leftTopLon.longitude,
        rightBottomLon.latitude,
        rightBottomLon.longitude,
        leftTopLon.latitude)
    });
    let instance = new Cesium.GeometryInstance({
      geometry: geometry,
    });

    let radians = 0;
    let expand = 0.4;
    let expandDirection = 0;
    let primitive = new Cesium.GroundPrimitive({
      geometryInstances: [instance],
      appearance: new Cesium.EllipsoidSurfaceAppearance({
        material: new Cesium.Material({
          fabric: {
            type: 'Rim',
            uniforms: {
              radians: 0,
              expand: 0.35,
              expandDirection: 0,
              color: { x: 0.70, y: 0.95, z: 0.18 }
            },
            source: `
            #define M_PI 3.1415926535897932384626433832795

            // uniform sampler2D image;
            uniform float radians;
            uniform float expand;
            uniform float expandDirection;
            uniform vec3 color;

            // 求余数，webgl没有原生求余操作
            int mod(int x, int y) {
              if (x < 0) {
                x = -x;
              }
              int z = x / y;
              return x - z * y;
            }

            czm_material czm_getMaterial(czm_materialInput materialInput)
            {
              czm_material material = czm_getDefaultMaterial(materialInput);
              vec2 st = vec2(materialInput.st.x - 0.5, materialInput.st.y - 0.5);
              float alpha = 1.15 - st.x - 0.5;
              float current_radians = atan(st.y, st.x);
              float radius = sqrt(st.x * st.x + st.y * st.y);
              if (radius > expand && radius <= expand + 0.01) { 
                if (expandDirection == 1.0) {
                  current_radians = current_radians + radians / 1.0;
                } else {
                  current_radians = current_radians - radians / 2.0;
                }
                int index = int(current_radians / M_PI * 20.0);
                int modIndex = mod(index, 2);
                if ((modIndex != 0 && current_radians > 0.0) || (modIndex != 1 && current_radians < 0.0)) {
                  material.diffuse = color;
                  material.alpha = (0.50 - expand) / 0.2 * 1.0 * alpha;
                } else {
                  material.alpha = 0.0;
                }
              } else if (radius < 0.1) {
                material.diffuse = color;
                material.alpha = alpha;
              } else if  (radius < 0.13) {
                material.diffuse = vec3(0.94, 1.0, 0.77);
                material.alpha = alpha;
              } else if (radius < 0.18) {
                material.diffuse = vec3(0.94, 1.0, 0.77);
                material.alpha = (0.18 - radius) / 0.05 * alpha;
              } else if (radius < 0.25 && radius > 0.22) {
                current_radians = current_radians - radians;
                int cornor = int(current_radians / (M_PI / 2.0)); 
                float modNum = current_radians - float(cornor) * (M_PI / 2.0);
                if (modNum < 0.0) modNum = -modNum;

                if (modNum < (M_PI / 6.0)) {
                  material.alpha = 0.0;
                } else {
                  material.diffuse = color;
                  material.alpha = alpha;
                }
              } else {
                material.alpha = 0.0;
              }

              return material;
            }
            `
          }
        })
      })
    });
    viewer.scene.primitives.add(primitive);
    viewer.scene.preUpdate.addEventListener(() => {
      radians += Math.PI / 90;
      if (expandDirection === 0) {
        // expand = ((expand - 0.35) + 0.002) % 0.15 + 0.35;
        expand = expand + 0.002;
        if (expand > 0.50) {
          expand = 0.50;
          expandDirection = 1;
        }
      } else {
        // expand = ((expand - 0.35) - 0.002) % 0.15 + 0.35;
        expand = expand - 0.008;
        if (expand < 0.25) {
          expand = 0.25;
          expandDirection = 0;
        }
      }
      primitive.appearance.material.uniforms.radians = radians;
      primitive.appearance.material.uniforms.expand = expand;
      primitive.appearance.material.uniforms.expandDirection = expandDirection;
    });
    this.primitives.push(primitive);
  }

}

export class CityPoint {
  static primitives: any[] = [];

  static draw(viewer: any, coordinates: number[], material?: any) {
    let center = Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1]);
    let leftTop = Coordinates.move(center, [-30000, 30000, 0]);
    let rightBottom = Coordinates.move(center, [30000, -30000, 0]);
    let leftTopLon = Coordinates.c3sToRadians(leftTop);
    let rightBottomLon = Coordinates.c3sToRadians(rightBottom);
    let geometry: any = new Cesium.RectangleGeometry({
      rectangle: new Cesium.Rectangle(
        leftTopLon.longitude,
        rightBottomLon.latitude,
        rightBottomLon.longitude,
        leftTopLon.latitude)
    });
    let instance = new Cesium.GeometryInstance({
      geometry: geometry,
    });

    let radians = 0;
    let expand = 0.4;
    let primitive = new Cesium.GroundPrimitive({
      geometryInstances: [instance],
      appearance: new Cesium.EllipsoidSurfaceAppearance({
        material: new Cesium.Material({
          fabric: {
            type: 'Image',
            uniforms: {
              image: material || '/img/rim.png',
              radians: 0,
              expand: 0.35,
            },
            source: `
            #define M_PI 3.1415926535897932384626433832795

            uniform sampler2D image;
            uniform float radians;
            uniform float expand;

            // 求余数，webgl没有原生求余操作
            int mod(int x, int y) {
              if (x < 0) {
                x = -x;
              }
              int z = x / y;
              return x - z * y;
            }

            czm_material czm_getMaterial(czm_materialInput materialInput)
            {
              czm_material material = czm_getDefaultMaterial(materialInput);
              vec2 st = vec2(materialInput.st.x - 0.5, materialInput.st.y - 0.5);
              float alpha = 1.3 - st.x - 0.5;
              float current_radians = atan(st.y, st.x);
              float radius = sqrt(st.x * st.x + st.y * st.y);
              if (radius < 0.50) {
                current_radians = current_radians - radians;
                st = vec2(cos(current_radians) * radius, sin(current_radians) * radius);
                st = vec2(st.x + 0.5, st.y + 0.5);
                vec4 colorImage = texture2D(image, st);
                material.diffuse = colorImage.rgb;
                material.alpha = colorImage.a * alpha;
              } else {
                material.alpha = 0.0;
              }

              return material;
            }
            `
          }
        })
      })
    });
    viewer.scene.primitives.add(primitive);
    viewer.scene.preUpdate.addEventListener(() => {
      radians += Math.PI / 90;
      // radians %= Math.PI * 2;
      expand -= 0.35;
      expand += 0.002;
      expand %= 0.15;
      expand += 0.35;
      primitive.appearance.material.uniforms.radians = radians;
      primitive.appearance.material.uniforms.expand = expand;
    });
    this.primitives.push(primitive);
  }

}

export class CapitalStar {
  static primitives: any[] = [];

  static draw(viewer: any, coordinates: number[], size: { x: number, y: number }, material?: any) {
    let center = Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1]);
    let leftTop = Coordinates.move(center, [-size.x / 2, size.y / 2, 0]);
    let rightBottom = Coordinates.move(center, [size.x / 2, -size.y / 2, 0]);
    let leftTopLon = Coordinates.c3sToRadians(leftTop);
    let rightBottomLon = Coordinates.c3sToRadians(rightBottom);
    let geometry: any = new Cesium.RectangleGeometry({
      rectangle: new Cesium.Rectangle(
        leftTopLon.longitude,
        rightBottomLon.latitude,
        rightBottomLon.longitude,
        leftTopLon.latitude)
    });
    let instance = new Cesium.GeometryInstance({
      geometry: geometry,
    });

    let radians = 0;
    let expand = 0.4;
    let primitive = new Cesium.GroundPrimitive({
      geometryInstances: [instance],
      appearance: new Cesium.EllipsoidSurfaceAppearance({
        material: new Cesium.Material({
          fabric: {
            type: 'Image',
            uniforms: {
              image: material || '/img/star.png',
              radians: 0,
              expand: 0.35,
            },
            source: `
            #define M_PI 3.1415926535897932384626433832795

            uniform sampler2D image;
            uniform float radians;
            uniform float expand;

            // 求余数，webgl没有原生求余操作
            int mod(int x, int y) {
              if (x < 0) {
                x = -x;
              }
              int z = x / y;
              return x - z * y;
            }

            czm_material czm_getMaterial(czm_materialInput materialInput)
            {
              czm_material material = czm_getDefaultMaterial(materialInput);
              vec2 st = vec2(materialInput.st.x - 0.5, materialInput.st.y - 0.5);
              float alpha = 1.3 - st.x - 0.5;
              float current_radians = atan(st.y, st.x);
              float radius = sqrt(st.x * st.x + st.y * st.y);
              if (radius < 0.30) {
                // current_radians = current_radians - radians;
                // st = vec2(cos(current_radians) * radius, sin(current_radians) * radius);
                st = vec2(st.x + 0.5, st.y + 0.5);
                vec4 colorImage = texture2D(image, st);
                material.diffuse = colorImage.rgb;
                material.alpha = colorImage.a * alpha;
              } else if (radius < 0.42 && radius >= 0.36) {
                current_radians = current_radians - radians / 1.0;
                int index = int(current_radians / M_PI * 6.0);
                int modIndex = mod(index, 2);
                if ((modIndex != 0 && current_radians > 0.0) || (modIndex != 1 && current_radians < 0.0)) {
                  material.diffuse = vec3(1.0, 0.0, 0.0);
                  material.alpha = (0.50 - expand) / 0.2 * 1.0 * alpha;
                } else {
                  material.alpha = 0.0;
                }
                // material.diffuse = vec3(1.0, 0.0, 0.0);
                // material.alpha = alpha;
              } else {
                material.alpha = 0.0;
              }

              return material;
            }
            `
          }
        })
      })
    });
    viewer.scene.primitives.add(primitive);
    viewer.scene.preUpdate.addEventListener(() => {
      radians += Math.PI / 90;
      primitive.appearance.material.uniforms.radians = radians;
      primitive.appearance.material.uniforms.expand = expand;
    });
    this.primitives.push(primitive);
  }

}

export class Cylinder {
  static draw(viewer: any) {
    const length = 200000;
    const positionOnEllipsoid = Cesium.Cartesian3.fromDegrees(121.723821936, 29.811854271);
    const modelMatrix = Cesium.Matrix4.multiplyByTranslation(
      Cesium.Transforms.eastNorthUpToFixedFrame(positionOnEllipsoid),
      new Cesium.Cartesian3(0.0, 0.0, length * 0.5), new Cesium.Matrix4()
    );
    var geometry = new Cesium.CylinderGeometry({
      length: length,
      topRadius: 80000,
      bottomRadius: 200000,
    });
    let instance = new Cesium.GeometryInstance({
      geometry: geometry,
      modelMatrix: modelMatrix
    });
    let primitive = new Cesium.Primitive({
      geometryInstances: [instance],
      appearance: new Cesium.EllipsoidSurfaceAppearance({
        material: new Cesium.Material({
          fabric: {
            type: 'Color',
            uniforms: {
              color: Cesium.Color.RED
            },
          }
        })
      })
    });
    viewer.scene.primitives.add(primitive);
  }
}

export class DashLine {
  static draw(viewer: any, positions: number[], material?: string) {
    viewer.entities.add({
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray(positions),
        width: 5,
        material: new Cesium.PolylineDashMaterialProperty({
          // image: '/img/rail.png',
          // repeat: new Cesium.Cartesian2(10.0, 1.0)
          color: Cesium.Color.GRAY,
          gapColor: Cesium.Color.WHITE,
          dashLength: 40,
          classificationType: Cesium.ClassificationType.BOTH
        })
      }
    });
  }
}

export class Box {
  static draw(viewer: any, coordinate: any, color: string) {
    return viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(coordinate[0], coordinate[1], 5000),
      box: {
        dimensions: { x: 10000, y: 10000, z: 10000 },
        material: Cesium.Color.fromCssColorString(color),
        show: true,
        shadows: Cesium.ShadowMode.ENABLED
      }
    });
  }
}

export class Radar {
  static draw(viewer: any, coordinates: number[], radius: number, color: string) {
    let _color: any = Cesium.Color.fromCssColorString(color);
    let center = Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1]);
    let leftTop = Coordinates.move(center, [-radius, radius, 0]);
    let rightBottom = Coordinates.move(center, [radius, -radius, 0]);
    let leftTopLon = Coordinates.c3sToRadians(leftTop);
    let rightBottomLon = Coordinates.c3sToRadians(rightBottom);
    let geometry: any = new Cesium.RectangleGeometry({
      rectangle: new Cesium.Rectangle(
        leftTopLon.longitude,
        rightBottomLon.latitude,
        rightBottomLon.longitude,
        leftTopLon.latitude)
    });
    let instance = new Cesium.GeometryInstance({
      geometry: geometry,
    });

    let primitive = new Cesium.GroundPrimitive({
      geometryInstances: [instance],
      appearance: new Cesium.EllipsoidSurfaceAppearance({
        material: new Cesium.Material({
          fabric: {
            type: 'Rim',
            uniforms: {
              radians: 0,
              color: { x: _color.x, y: _color.y, z: _color.z }
            },
            source: `
                  #define M_PI 3.1415926535897932384626433832795
      
                  // uniform sampler2D image;
                  uniform float radians;
                  uniform vec3 color;
      
                  // 求余数，webgl没有原生求余操作
                  int mod(int x, int y) {
                    if (x < 0) {
                      x = -x;
                    }
                    int z = x / y;
                    return x - z * y;
                  }
      
                  czm_material czm_getMaterial(czm_materialInput materialInput)
                  {
                    czm_material material = czm_getDefaultMaterial(materialInput);
                    vec2 st = vec2(materialInput.st.x - 0.5, materialInput.st.y - 0.5);
                    material.diffuse = vec3(0.1, 0.1, 0.1);
                    return material;
                  }
                  `
          }
        })
      })
    });
    viewer.scene.primitives.add(primitive);
    viewer.scene.preUpdate.addEventListener(() => {
      // primitive.appearance.material.uniforms.radians = radians;
    });
  }
}

export class RoadLine {

  static draw(viewer: any, url: string) {
    Cesium.GeoJsonDataSource.load(url).then((res: any) => {
      let features = res.entities.values;
      for (let feature of features) {
        feature.polyline.positions = feature.polyline.positions._value.map((c3s: any) => {
          return Coordinates.move(c3s, [0, 0, 10]);
        });
        feature.polyline.width = 5;
        feature.polyline.material = new Cesium.PolylineGlowMaterialProperty({
          color: Cesium.Color.fromCssColorString('#00ffff'),
          glowPower: 0.25,
          taperPower: 1.0
        });
        feature.polyline.zIndex = -1;
        feature.clampToGround = true;
        viewer.entities.add(feature);
      }
    });
  }

}
