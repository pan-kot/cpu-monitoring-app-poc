import { memo } from 'react';
import { ThemeConsumer } from 'styled-components';
import { Circle } from '@visx/shape';

import { TimeValue } from '../../../domain';

import { LoadScale, OffsetScale } from '../types';

type TProps = {
  tick: TimeValue;
  loadScale: LoadScale;
  offsetScale: OffsetScale;
};

function LoadEvent({ tick, offsetScale, loadScale }: TProps) {
  return (
    <ThemeConsumer>
      {theme => {
        const color = tick.event ? theme.event[tick.event] : undefined;

        return (
          <>
            <Circle
              cx={offsetScale(-tick.offset)}
              cy={loadScale(tick.value)}
              fill={color}
              r={4}
            />

            <Circle
              cx={offsetScale(-tick.offset)}
              cy={loadScale(tick.value)}
              stroke={color}
              strokeWidth={3}
              fill="transparent"
              r={7}
            />
          </>
        );
      }}
    </ThemeConsumer>
  );
}

export default memo(LoadEvent);
