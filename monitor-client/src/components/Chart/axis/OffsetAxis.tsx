import { memo } from 'react';
import { AxisBottom } from '@visx/axis';

import { Settings } from '../../../domain';

import { OffsetScale } from '../types';
import useOffsetFormatter from '../scale/useOffsetFormatter';

type TProps = {
  top: number;
  settings: Settings;
  offsetScale: OffsetScale;
  offsetTicks: number[];
};

function OffsetAxis({ top, settings, offsetScale, offsetTicks }: TProps) {
  const offsetFormatter = useOffsetFormatter({ settings });

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
