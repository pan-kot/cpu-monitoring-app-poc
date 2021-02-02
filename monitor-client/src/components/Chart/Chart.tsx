import { useMemo } from 'react';

import type { ChartProps, ChartDimensions } from './types';

import useLoadScale from './useLoadScale';
import useOffsetScale from './useOffsetScale';
import useOffsetTicks from './useOffsetTicks';

import ChartGroup from './atoms/ChartGroup';
import LoadAxis from './LoadAxis';
import LoadCurve from './LoadCurve';
import LoadEvent from './LoadEvent';
import LoadThreshold from './LoadThreshold';
import OffsetAxis from './OffsetAxis';

type TProps = ChartProps & ChartDimensions;

export default function AverageLoadChart({
  settings,
  timeseries,
  maximum,
  ...dimensions
}: TProps) {
  const { xMax, yMax } = dimensions;

  const offsetScale = useOffsetScale({ settings, xMax });

  const loadScale = useLoadScale({ settings, maximum, yMax });

  const offsetTicks = useOffsetTicks({ settings });

  return (
    <ChartGroup
      {...dimensions}
      xScale={offsetScale}
      yScale={loadScale}
      xTicks={offsetTicks}
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
    </ChartGroup>
  );
}
