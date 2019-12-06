import React, { useEffect, useState } from 'react';
import ToolCommon from './ToolCommon';
import { Area, Distance, Point, Bloom, Sunlight } from './Tools';
import './index.scss';
import Tooltip from '../common/tooltip';

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
    {
      name: '框选',
      icon: 'gdp-box-select',
      active: false,
      tool: Area,
    },
    {
      name: '泛光',
      icon: 'gdp-bloom',
      active: false,
      tool: Bloom,
    },
    {
      name: '光照',
      icon: 'gdp-sun',
      active: false,
      tool: Sunlight,
    },
  ]);

  function toggleTool(name: string) {
    if (name === '坐标测量' || name === '距离测量' || name === '面积测量') {
      toolList.forEach((tool: Tool) => {
        if (
          (tool.name === '坐标测量' || tool.name === '距离测量' || tool.name === '面积测量') &&
          tool.name !== name
        ) {
          tool.active = false;
          tool.tool.disable();
        }
      });
    }
    let tool: Tool | undefined = toolList.find((tool: Tool) => tool.name === name);
    tool && (tool.active = !tool.active);
    tool && tool.active && tool.tool.enable();
    tool && !tool.active && tool.tool.disable();

    setToolList(toolList.concat([]));
  }

  return (
    <div className="tool-container">
      <div className={`tool-list-wrap${toolExpand ? ' expand' : ' shrink'}`}>
        <div className="tool-list">
          {toolList.map((tool: Tool, index: number) => (
            <Tooltip direction="top" content={tool.name} delay={300} key={index}>
              <span
                key={index}
                className={`iconfont ${tool.icon}${tool.active ? ' active' : ''}`}
                onClick={toggleTool.bind(null, tool.name)}
              />
            </Tooltip>
          ))}
        </div>
      </div>
      <Tooltip direction="top" content="工具箱" delay={300}>
        <div className="tool-toggle-btn" onClick={e => setToolExpand(!toolExpand)}>
          <span className="iconfont gdp-tool" />
        </div>
      </Tooltip>
    </div>
  );
};

export default Tool;
