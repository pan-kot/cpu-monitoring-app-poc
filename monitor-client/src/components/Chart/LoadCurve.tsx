import { memo, useCallback } from 'react';
import { ThemeConsumer } from 'styled-components';
import { curveNatural } from '@visx/curve';
import { AreaClosed, LinePath } from '@visx/shape';

import { TimeValue } from '../../domain';

import { LoadScale, OffsetScale } from './types';

type TProps = {
  timeseries: TimeValue[];
  loadScale: LoadScale;
  offsetScale: OffsetScale;
};

function LoadCurve({ timeseries, loadScale, offsetScale }: TProps) {
  const renderX = useCallback(tick => offsetScale(-tick.offset), [offsetScale]);
  const renderY = useCallback(tick => loadScale(tick.value), [loadScale]);
  const defined = useCallback(tick => Boolean(tick), []);

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
            curve={curveNatural}
            fill={theme.chart.curve.area}
            stroke="none"
          />

          <LinePath
            data={timeseries}
            x={renderX}
            y={renderY}
            defined={defined}
            curve={curveNatural}
            stroke={theme.chart.curve.stroke}
            strokeWidth={1.5}
          />
        </>
      )}
    </ThemeConsumer>
  );
}

export default memo(LoadCurve);
