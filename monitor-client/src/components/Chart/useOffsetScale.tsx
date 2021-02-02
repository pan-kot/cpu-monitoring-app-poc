import { useMemo } from 'react';
import { scaleLinear } from '@visx/scale';

import { Settings } from '../../domain';

type TProps = {
  settings: Settings;
  xMax: number;
};

export default function useOffsetScale({ settings, xMax }: TProps) {
  return useMemo(() => {
    const maxOffset = settings.maxTicks - 1;

    return scaleLinear({
      domain: [-maxOffset, 0],
      range: [0, xMax]
    });
  }, [settings.maxTicks, xMax]);
}
