import { useCallback, memo } from 'react';
import { AxisBottom } from '@visx/axis';

import { Settings } from '../../domain';

import { OffsetScale } from './types';

type TProps = {
  top: number;
  settings: Settings;
  offsetScale: OffsetScale;
  offsetTicks: number[];
};

function OffsetAxis({ top, settings, offsetScale, offsetTicks }: TProps) {
  const offsetFormatter = useCallback(
    offset => {
      const offsetSeconds = -offset * settings.tickInterval;

      const minutes = Math.floor(offsetSeconds / 60);
      const seconds = offsetSeconds % 60;

      if (minutes && !seconds) {
        return `${minutes}m`;
      }

      if (!minutes && seconds) {
        return `${seconds}s`;
      }

      return `${minutes}m ${seconds}s`;
    },
    [settings.tickInterval]
  );

  return (
    <AxisBottom
      top={top}
      scale={offsetScale}
      tickFormat={offsetFormatter}
      tickValues={offsetTicks}
    />
  );
}

export default memo(OffsetAxis);
