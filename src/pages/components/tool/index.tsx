import React, { useEffect, useState } from 'react';
import { Area, Distance, Point } from './measure';
import './index.scss';
import ToolCommon from './ToolCommon';

interface Props {}

interface Tool {
  name: string;
  icon: string;
  active: boolean;
  tool: ToolCommon;
}

const Tool: React.FC<Props> = props => {
  const [toolExpand, setToolExpand] = useState(false);
  const [toolList, setToolList] = useState<Tool[]>([
    {
      name: '坐标测量',
      icon: 'gdp-coordinate',
      active: false,
      tool: Point,
    },
    {
      name: '距离测量',
      icon: 'gdp-distance',
      active: false,
      tool: Distance,
    },
    {
      name: '面积测量',
      icon: 'gdp-area',
      active: false,
      tool: Area,
    },
  ]);

  function toggleTool(name: string) {
    for (let tool of toolList) {
      if (tool.active) {
        tool.tool.disable();
      }
      if (tool.name !== name) {
        tool.active = false;
      } else {
        tool.active = !tool.active;
        tool.active && tool.tool.enable();
      }
    }

    setToolList(toolList.concat([]));
  }

  return (
    <div className="tool-container">
      <div className={`tool-list-wrap${toolExpand ? ' expand' : ' shrink'}`}>
        <div className="tool-list">
          {toolList.map((tool: Tool, index: number) => (
            <span
              key={index}
              className={`iconfont ${tool.icon}${tool.active ? ' active' : ''}`}
              onClick={toggleTool.bind(null, tool.name)}
            />
          ))}
        </div>
      </div>
      <div className="tool-toggle-btn" onClick={e => setToolExpand(!toolExpand)}>
        <span className="iconfont gdp-tool" />
      </div>
    </div>
  );
};

export default Tool;
