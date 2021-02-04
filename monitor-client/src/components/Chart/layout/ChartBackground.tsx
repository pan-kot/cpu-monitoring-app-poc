import { useContext, memo } from 'react';
import { ThemeContext } from 'styled-components';

import useDimensions from '../useDimensions';

function ChartBackground() {
  const { width, height } = useDimensions();

  const theme = useContext(ThemeContext);

  return (
    <rect
      x={0}
      y={0}
      width={width}
      height={height}
      fill={theme.chart.bg}
      rx={14}
    />
  );
}

export default memo(ChartBackground);
