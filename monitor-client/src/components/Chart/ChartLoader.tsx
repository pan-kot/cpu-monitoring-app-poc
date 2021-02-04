import styled from 'styled-components';
import AutoSize from 'react-virtualized-auto-sizer';

import type { ChartProps } from './types';
import Chart from './Chart';
import { ChartDimensionsContext, margin } from './useDimensions';

export default function AverageLoadChartLoader(props: ChartProps) {
  return (
    <Card>
      <AutoSize>
        {({ width, height }) => {
          const xMax = width - margin.left - margin.right;
          const yMax = height - margin.top - margin.bottom;
          const dimensions = { width, height, margin, xMax, yMax };

          return (
            <ChartDimensionsContext.Provider value={dimensions}>
              <Chart {...props} />
            </ChartDimensionsContext.Provider>
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
