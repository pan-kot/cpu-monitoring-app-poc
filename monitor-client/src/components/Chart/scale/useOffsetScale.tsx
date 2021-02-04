import { useMemo } from 'react';
import { scaleLinear } from '@visx/scale';

import { Settings } from '../../../domain';

import useDimensions from '../useDimensions';

type TProps = {
  settings: Settings;
};

export default function useOffsetScale({ settings }: TProps) {
  const { xMax } = useDimensions();

  return useMemo(() => {
    const maxOffset = settings.maxTicks;

    return scaleLinear({
      domain: [-maxOffset, 0],
      range: [0, xMax]
    });
  }, [settings.maxTicks, xMax]);
}
