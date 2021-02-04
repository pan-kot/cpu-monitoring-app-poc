import { memo, useCallback } from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { ScaleLinear } from 'd3-scale';
import { localPoint } from '@visx/event';

import useDimensions from '../useDimensions';

import ChartBackground from './ChartBackground';
import ChartGrid from './ChartGrid';
import OfflineOverlay from './OfflineOverlay';

type HoverEvent =
  | React.TouchEvent<SVGRectElement>
  | React.MouseEvent<SVGRectElement>;

type TProps = {
  connected: boolean;
  children: React.ReactNode;
  xScale: ScaleLinear<any, any>;
  yScale: ScaleLinear<any, any>;
  xTicks?: number[];
  yTicks?: number[];
  onHover?: (coordinates: { x: number; y: number }) => void;
  onBlur?: () => void;
};

function ChartLayout({
  connected,
  children,
  xScale,
  yScale,
  xTicks,
  yTicks,
  onHover,
  onBlur
}: TProps) {
  const { height, width, margin, xMax, yMax } = useDimensions();

  const handleHover = useCallback(
    (event: HoverEvent) => {
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
      <ChartBackground />

      <Group left={margin.left} top={margin.top}>
        <ChartGrid
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

      {!connected ? <OfflineOverlay /> : null}
    </svg>
  );
}

export default memo(ChartLayout);
