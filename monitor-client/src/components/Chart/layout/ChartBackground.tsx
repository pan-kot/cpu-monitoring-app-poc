import { useContext, memo } from 'react';
import { ThemeContext } from 'styled-components';

type TProps = {
  width: number;
  height: number;
};

function ChartBackground({ width, height }: TProps) {
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
