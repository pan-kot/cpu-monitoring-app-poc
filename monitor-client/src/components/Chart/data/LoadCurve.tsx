import { memo, useCallback } from 'react';
import { ThemeConsumer } from 'styled-components';
import { curveMonotoneX } from '@visx/curve';
import { AreaClosed, LinePath } from '@visx/shape';

import { TimeValue } from '../../../domain';

import { LoadScale, OffsetScale } from '../types';

type TProps = {
  timeseries: TimeValue[];
  loadScale: LoadScale;
  offsetScale: OffsetScale;
};

function LoadCurve({ timeseries, loadScale, offsetScale }: TProps) {
  const renderX = useCallback((_, index) => offsetScale(-index), [offsetScale]);

  const renderY = useCallback(tick => loadScale(tick?.value || 0), [loadScale]);

  // Allow rendering all defined ticks + 1 to complete the curve in 0.
  const defined = useCallback(
    (_, index) => index === 0 || Boolean(timeseries[index - 1]),
    [timeseries]
  );

  return (
    <ThemeConsumer>
      {theme => (
        <>
          <AreaClosed
            data={timeseries}
            x={renderX}
            y={renderY}
            yScale={loadScale}
            defined={defined}
            curve={curveMonotoneX}
            fill={theme.chart.curve.area}
            stroke="none"
          />

          <LinePath
            data={timeseries}
            x={renderX}
            y={renderY}
            defined={defined}
            curve={curveMonotoneX}
            stroke={theme.chart.curve.stroke}
            strokeWidth={1.5}
          />
        </>
      )}
    </ThemeConsumer>
  );
}

export default memo(LoadCurve);
