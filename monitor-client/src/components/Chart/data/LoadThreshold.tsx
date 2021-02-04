import { memo } from 'react';
import { ThemeConsumer } from 'styled-components';

import { EventType, Settings } from '../../../domain';

import { LoadScale } from '../types';
import useDimensions from '../useDimensions';

type TProps = {
  settings: Settings;
  loadScale: LoadScale;
};

function LoadThreshold({ settings, loadScale }: TProps) {
  const { xMax } = useDimensions();

  return (
    <ThemeConsumer>
      {theme => (
        <>
          <line
            x1={0}
            x2={xMax}
            y1={loadScale(settings.recoveryThreshold.value)}
            y2={loadScale(settings.recoveryThreshold.value)}
            stroke={theme.event[EventType.RECOVERY]}
            strokeDasharray="4"
          />
          <line
            x1={0}
            x2={xMax}
            y1={loadScale(settings.highLoadThreshold.value)}
            y2={loadScale(settings.highLoadThreshold.value)}
            stroke={theme.event[EventType.HIGH_LOAD]}
            strokeDasharray="4"
          />
        </>
      )}
    </ThemeConsumer>
  );
}

export default memo(LoadThreshold);
