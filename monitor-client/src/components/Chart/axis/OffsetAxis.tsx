import { memo } from 'react';
import { AxisBottom } from '@visx/axis';

import { Settings } from '../../../domain';

import { OffsetScale } from '../types';
import useOffsetFormatter from '../scale/useOffsetFormatter';
import useDimensions from '../useDimensions';

type TProps = {
  settings: Settings;
  offsetScale: OffsetScale;
  offsetTicks: number[];
};

function OffsetAxis({ settings, offsetScale, offsetTicks }: TProps) {
  const { yMax } = useDimensions();

  const offsetFormatter = useOffsetFormatter({ settings });

  return (
    <AxisBottom
      top={yMax}
      scale={offsetScale}
      tickFormat={offsetFormatter}
      tickValues={offsetTicks}
    />
  );
}

export default memo(OffsetAxis);
