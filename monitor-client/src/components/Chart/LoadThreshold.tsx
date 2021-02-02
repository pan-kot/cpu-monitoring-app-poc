import { memo } from 'react';
import { ThemeConsumer } from 'styled-components';

import { LoadScale } from './types';

type TProps = {
  xMax: number;
  loadScale: LoadScale;
};

function LoadThreshold({ xMax, loadScale }: TProps) {
  return (
    <ThemeConsumer>
      {theme => (
        <line
          x1={0}
          x2={xMax}
          y1={loadScale(1)}
          y2={loadScale(1)}
          stroke={theme.chart.threshold.stroke}
          strokeDasharray="4"
        />
      )}
    </ThemeConsumer>
  );
}

export default memo(LoadThreshold);
