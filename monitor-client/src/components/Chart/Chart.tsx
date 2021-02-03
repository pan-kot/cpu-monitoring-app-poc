import { useCallback } from 'react';
import { useTooltip } from '@visx/tooltip';
import { bisector } from 'd3-array';

import { TimeValue } from '../../domain';
import type { ChartProps, ChartDimensions } from './types';

import useLoadScale from './scale/useLoadScale';
import useOffsetScale from './scale/useOffsetScale';
import useOffsetTicks from './scale/useOffsetTicks';

import ChartLayout from './layout/ChartLayout';

import LoadAxis from './axis/LoadAxis';
import OffsetAxis from './axis/OffsetAxis';

import LoadCurve from './data/LoadCurve';
import LoadEvent from './data/LoadEvent';
import LoadThreshold from './data/LoadThreshold';

import Tooltip, { TTooltipData } from './tooltip/Tooltip';
import TooltipCursor from './tooltip/TooltipCursor';

type TProps = ChartProps & ChartDimensions;

type THoverCoordinates = { x: number; y: number };

// Offset accessor ensuring bisect to return left-most element if out of range.
const getTickOffset = (tick: TimeValue) =>
  tick ? tick.offset : Number.MAX_SAFE_INTEGER;

// Index lookup for timeseries tick by offset.
const bisectOffset = bisector<TimeValue, number>(getTickOffset).left;

// Accessor for the closest timeseries tick by exact offset value.
const getTickByOffset = (timeseries: TimeValue[], offset: number) => {
  const index = bisectOffset(timeseries, -offset, 0);

  const tickToTheLeft = timeseries[index];
  const tickToTheRight = timeseries[index - 1];

  if (!tickToTheLeft) {
    return null;
  }

  // Resolving 0-offset tick when offset value is closer to 0 than -1.
  return offset < -0.5 ? tickToTheLeft : tickToTheRight;
};

export default function AverageLoadChart({
  connected,
  settings,
  timeseries,
  maximum,
  ...dimensions
}: TProps) {
  const { xMax, yMax, margin } = dimensions;

  const offsetScale = useOffsetScale({ settings, xMax });

  const loadScale = useLoadScale({ settings, maximum, yMax });

  const offsetTicks = useOffsetTicks({ settings });

  const { showTooltip, hideTooltip, tooltipLeft, tooltipData } = useTooltip<
    TTooltipData
  >();

  const onHover = useCallback(
    ({ x }: THoverCoordinates) => {
      const offset = offsetScale.invert(x);

      const tick = getTickByOffset(timeseries, offset);

      showTooltip({ tooltipLeft: x, tooltipData: { tick } });
    },
    [offsetScale, timeseries]
  );

  const onBlur = hideTooltip;

  return (
    <>
      <ChartLayout
        {...dimensions}
        connected={connected}
        xScale={offsetScale}
        yScale={loadScale}
        xTicks={offsetTicks}
        onHover={onHover}
        onBlur={onBlur}
      >
        <LoadAxis loadScale={loadScale} />

        <OffsetAxis
          settings={settings}
          offsetScale={offsetScale}
          offsetTicks={offsetTicks}
          top={yMax}
        />

        <LoadThreshold xMax={xMax} loadScale={loadScale} />

        <LoadCurve
          timeseries={timeseries}
          loadScale={loadScale}
          offsetScale={offsetScale}
        />

        {timeseries
          .filter(tick => tick.event)
          .map(tick => (
            <LoadEvent
              key={tick.offset}
              tick={tick}
              loadScale={loadScale}
              offsetScale={offsetScale}
            />
          ))}

        {tooltipLeft !== undefined ? (
          <TooltipCursor x={tooltipLeft} yMax={yMax} />
        ) : null}
      </ChartLayout>

      {tooltipData ? (
        <Tooltip
          settings={settings}
          data={tooltipData}
          top={margin.top + 5}
          left={xMax + margin.left - 10}
          styles={{ transform: 'translateX(-100%)', width: 120 }}
        />
      ) : null}
    </>
  );
}
