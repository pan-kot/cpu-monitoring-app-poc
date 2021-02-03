import { memo, useCallback } from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { ScaleLinear } from 'd3-scale';
import { localPoint } from '@visx/event';

import type { ChartDimensions } from '../types';

import ChartBackground from './ChartBackground';
import ChartGrid from './ChartGrid';

type THoverEvent =
  | React.TouchEvent<SVGRectElement>
  | React.MouseEvent<SVGRectElement>;

type TProps = ChartDimensions & {
  children: React.ReactNode;
  xScale: ScaleLinear<any, any>;
  yScale: ScaleLinear<any, any>;
  xTicks?: number[];
  yTicks?: number[];
  onHover?: (coordinates: { x: number; y: number }) => void;
  onBlur?: () => void;
};

function ChartLayout({
  children,
  height,
  width,
  margin,
  xMax,
  yMax,
  xScale,
  yScale,
  xTicks,
  yTicks,
  onHover,
  onBlur
}: TProps) {
  const handleHover = useCallback(
    (event: THoverEvent) => {
      if (onHover) {
        const coordinates = localPoint(event);

        if (coordinates) {
          const { x, y } = coordinates;

          onHover({ x: x - margin.left, y: y - margin.top });
        }
      }
    },
    [margin, onHover]
  );

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

      {onHover || onBlur ? (
        <Bar
          x={margin.left}
          y={margin.top}
          width={xMax}
          height={yMax}
          fill="transparent"
          onTouchStart={handleHover}
          onTouchMove={handleHover}
          onMouseMove={handleHover}
          onMouseLeave={onBlur}
        />
      ) : null}
    </svg>
  );
}

export default memo(ChartLayout);
