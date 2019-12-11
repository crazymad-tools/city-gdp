import { ImageryLayer } from 'cesium';

export default class ViewerService {

  static viewer: any;

  static googleMap: any;

  static tdtdMap: any;

  static init(id: string) {
    this.viewer = new Cesium.Viewer(id, {
      // imageryProvider: new Cesium.UrlTemplateImageryProvider({
      //   url: "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali"
      // }),
      animation: false, //是否显示动画控件(左下方那个)
      baseLayerPicker: false, //是否显示图层选择控件
      fullscreenButton: false,
      geocoder: false, //是否显示地名查找控件
      timeline: false, //是否显示时间线控件
      sceneModePicker: false, //是否显示投影方式控件
      navigationHelpButton: false, //是否显示帮助信息控件
      infoBox: false, //是否显示点击要素之后显示的信息
      imageryProvider: false, //地图提供器
      homeButton: false, //主页按钮
      selectionIndicator: false,
      hideLogo: true, //是否隐藏LOGO
      globalColor: Cesium.Color.BLACK, //球体颜色
      showFrames: false, //开启帧率显示
      RightControlMode: false, //修改鼠标设置
      cancelDoubleClick: true, //取消双击事件
      cancelSingleClick: false, //取消单击事件
      fxaa: false // 关闭抗锯齿
    });
    this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    this.viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(120.7122681450, 29.5065475918, 900000),
    });
    // this.viewer.scene.globe.depthTestAgainstTerrain = true;

    // this.viewer.scene.screenSpaceCameraController.enableTilt = false;
    // this.viewer.scene.screenSpaceCameraController.maximumZoomDistance = 900000;

    // 使用右键旋转角度
    // this.viewer.scene.screenSpaceCameraController.tiltEventTypes = [

    //   Cesium.CameraEventType.RIGHT_DRAG,

    //   { eventType: Cesium.CameraEventType.LEFT_DRAG, modifier: Cesium.KeyboardEventModifier.CTRL },

    //   { eventType: Cesium.CameraEventType.RIGHT_DRAG, modifier: Cesium.KeyboardEventModifier.CTRL }

    // ];

    // // 使用滚轮缩放
    // this.viewer.scene.screenSpaceCameraController.zoomEventTypes = [Cesium.CameraEventType.WHEEL, Cesium.CameraEventType.PINCH];

    // // 使用中键拖动地球
    // this.viewer.scene.screenSpaceCameraController.rotateEventTypes  = [Cesium.CameraEventType.MIDDLE_DRAG];

    this.loadMap();
    // this.loadTileset('http://popcity.popsmart.cn:9001/data/ningbo/shaoxing-b3dm-zhuanzuobiao/b3dm/tileset_20181001.json');
    // this.loadTileset('http://popcity.popsmart.cn:9001/data/ningbo/shaoxing-b3dm-zhuanzuobiao/b3dm/tileset_20190708.json');
  }

  static loadMap() {
    // this.googleMap = this.viewer.imageryLayers.addImageryProvider(
    //   new Cesium.UrlTemplateImageryProvider({
    //     url: 'http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali',
    //   })
    // );
    // this.tdtdMap = this.viewer.imageryLayers.addImageryProvider(
    //   // new Cesium.ImageryLayer(
    //   new Cesium.MapboxImageryProvider({
    //     mapId: 'mapbox.dark',
    //     accessToken: 'pk.eyJ1IjoiY3JhenltYWQwNjAxIiwiYSI6ImNqd2c0anpjMDE2bG40NG5wZXc5OHgyOHMifQ.Lw8VwGYJnV0xNrBjF5NMOw',
    //   }),
    //   //   {
    //   //     gama: 0.5,
    //   //     // alpha: 0.5
    //   //     // brightness: 0.5
    //   //   }
    //   // )
    //   // new Cesium.WebMapTileServiceImageryProvider({
    //   //   url: `http://{s}.tianditu.com/vec_w/wmts?tk=aaffda907f90f15f0a1efec9d3569fda&service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles`,
    //   //   layer: 'img',
    //   //   style: 'default',
    //   //   format: 'tiles',
    //   //   tileMatrixSetID: 'w',
    //   //   subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
    //   //   credit: new Cesium.Credit('天地图全球矢量服务'),
    //   //   maximumLevel: 18,
    //   // })
    // );

    // this.viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
    //     url : Cesium.IonResource.fromAssetId(3956),
    //     requestVertexNormals : true
    // });
  }

  static loadTileset (url: string) {
    let tileset = this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: url,
        show: true,
        skipLevelOfDetail: false,
        maximumNumberOfLoadedTiles: 500,
        maximumMemoryUsage: 512,
        baseScreenSpaceError: 1024,
        skipScreenSpaceErrorFactor: 16,
        skipLevels: 4,
        immediatelyLoadDesiredLevelOfDetail: false,
        loadSiblings: false,
        maximumScreenSpaceError: 1,
        cullWithChildrenBounds: true,
      }));
  }

  static getViewerPromise() {
    return new Promise((resolve: Function, reject: Function) => {
      if (this.viewer) resolve(this.viewer);

      let timer = setInterval(() => {
        if (this.viewer) {
          clearInterval(timer);
          resolve(this.viewer)
        };
      }, 100);
    });
  }

}
