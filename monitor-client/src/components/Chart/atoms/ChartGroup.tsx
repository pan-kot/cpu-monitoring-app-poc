import { memo } from 'react';
import { Group } from '@visx/group';
import { ScaleLinear } from 'd3-scale';

import type { ChartDimensions } from '../types';

import ChartBackground from './ChartBackground';
import ChartGrid from './ChartGrid';

type TProps = ChartDimensions & {
  children: React.ReactNode;
  xScale: ScaleLinear<any, any>;
  yScale: ScaleLinear<any, any>;
  xTicks?: number[];
  yTicks?: number[];
};

function ChartGroup({
  children,
  height,
  width,
  margin,
  xMax,
  yMax,
  xScale,
  yScale,
  xTicks,
  yTicks
}: TProps) {
  return (
    <svg height={height} width={width}>
      <ChartBackground width={width} height={height} />

      <Group left={margin.left} top={margin.top}>
        <ChartGrid
          xMax={xMax}
          yMax={yMax}
          xScale={xScale}
          yScale={yScale}
          xTicks={xTicks}
          yTicks={yTicks}
        />

        {children}
      </Group>
    </svg>
  );
}

export default memo(ChartGroup);
