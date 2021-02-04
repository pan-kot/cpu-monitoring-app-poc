import { memo } from 'react';
import { Line } from '@visx/shape';
import { ThemeConsumer } from 'styled-components';

import useDimensions from '../useDimensions';

type TProps = {
  x: number;
};

function TooltipCursor({ x }: TProps) {
  const { yMax } = useDimensions();

  return (
    <ThemeConsumer>
      {theme => (
        <Line
          from={{ x, y: 0 }}
          to={{ x, y: yMax }}
          stroke={theme.chart.cursor.stroke}
          pointerEvents="none"
          strokeDasharray="5,2"
        />
      )}
    </ThemeConsumer>
  );
}

export default memo(TooltipCursor);
