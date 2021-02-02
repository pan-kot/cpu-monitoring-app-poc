import styled from 'styled-components';
import AutoSize from 'react-virtualized-auto-sizer';

import Chart from './Chart';
import type { ChartProps } from './types';

const margin = {
  top: 40,
  right: 30,
  bottom: 50,
  left: 40
};

export default function AverageLoadChartLoader(props: ChartProps) {
  return (
    <Card>
      <AutoSize>
        {({ width, height }) => {
          const xMax = width - margin.left - margin.right;
          const yMax = height - margin.top - margin.bottom;

          return (
            <Chart
              {...props}
              width={width}
              height={height}
              margin={margin}
              xMax={xMax}
              yMax={yMax}
            />
          );
        }}
      </AutoSize>
    </Card>
  );
}

const Card = styled.div`
  position: relative;

  width: 100%;
  height: 500px;

  padding: 8px;

  background-color: ${props => props.theme.card.bg};

  border-radius: ${props => props.theme.card.radius};

  box-shadow: ${props => props.theme.card.shadow};
`;
