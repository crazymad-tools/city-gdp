import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import './index.scss';
import ViewerService from '@/service/ViewerService';

interface Tooltip {
  type: string;
  content: string;
  position: any;
  offset: { x: number; y: number };
  show: boolean;
}

interface Props {
  tooltips: Tooltip[];
}

const Tooltips: React.FC<Props> = props => {
  const [tooltips, setTooltips] = useState<any[]>([]);

  useEffect(() => {
    setTooltips(
      props.tooltips.map((tooltip: Tooltip) => {
        return Object.assign(
          {
            offset: { x: 0, y: 0 },
            show: false,
          },
          tooltip,
        );
      }),
    );
  }, [props.tooltips]);

  useEffect(() => {
    ViewerService.getViewerPromise().then((viewer: any) => {
      viewer.scene.postRender.addEventListener(() => {
        tooltips.forEach((tooltip: Tooltip) => {
          let offset = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
            viewer.scene,
            tooltip.position,
          );
          console.log(offset);
          let e: any = tooltip.position;
          let i: any = viewer.camera.position;
          let n: any = viewer.scene.ellipsoid.cartesian3ToCartographic(i).height;
          if (
            !(n + 1 * viewer.scene.ellipsoid.maximumRadius, Cesium.Cartesian3.distance(i, e) > n)
          ) {
            tooltip.show = true;
          } else {
            tooltip.show = false;
          }
          tooltip.offset = offset;
        });
        setTooltips(tooltips.concat([]));
      });
    });
  }, []);

  return (
    <div>
      {props.tooltips.map((tooltip: Tooltip) => (
        <div
          className="earth-tooltip"
          style={{ left: `${tooltip.offset.x}px`, top: `${tooltip.offset.y}px` }}
        >
          <pre>{tooltip.content}</pre>
        </div>
      ))}
    </div>
  );
};

export default connect((state: any) => {
  let { tooltips } = state['earth-tooltip'];

  return { tooltips };
})(Tooltips);
