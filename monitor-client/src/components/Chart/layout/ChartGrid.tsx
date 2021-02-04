import { memo } from 'react';
import { ThemeConsumer } from 'styled-components';
import { GridRows, GridColumns } from '@visx/grid';
import { ScaleLinear } from 'd3-scale';

import useDimensions from '../useDimensions';

type TProps = {
  xScale: ScaleLinear<any, any>;
  yScale: ScaleLinear<any, any>;
  xTicks?: number[];
  yTicks?: number[];
};

function ChartGrid({ xScale, yScale, xTicks, yTicks }: TProps) {
  const { xMax, yMax } = useDimensions();

  return (
    <ThemeConsumer>
      {theme => (
        <>
          <GridRows
            scale={yScale}
            width={xMax}
            height={yMax}
            stroke={theme.chart.grid.stroke}
            tickValues={yTicks}
          />
          <GridColumns
            scale={xScale}
            width={xMax}
            height={yMax}
            stroke={theme.chart.grid.stroke}
            tickValues={xTicks}
          />
          <line
            x1={xMax}
            x2={xMax}
            y1={0}
            y2={yMax}
            stroke={theme.chart.grid.stroke}
          />
        </>
      )}
    </ThemeConsumer>
  );
}

export default memo(ChartGrid);
