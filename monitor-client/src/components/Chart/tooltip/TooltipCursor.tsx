import { memo } from 'react';
import { Line } from '@visx/shape';
import { ThemeConsumer } from 'styled-components';

type TProps = {
  x: number;
  yMax: number;
};

function TooltipCursor({ x, yMax }: TProps) {
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
