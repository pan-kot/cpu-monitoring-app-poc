import { useMemo } from 'react';
import { scaleLinear } from '@visx/scale';

import { Settings } from '../../domain';

type TProps = {
  settings: Settings;
  maximum: number;
  yMax: number;
};

export default function useLoadScale({ settings, maximum, yMax }: TProps) {
  return useMemo(() => {
    const maxLoad = Math.max(maximum, settings.highLoadThreshold.value * 2);

    return scaleLinear({
      domain: [0, maxLoad],
      range: [yMax, 0],
      round: true
    });
  }, [settings.highLoadThreshold.value, maximum, yMax]);
}
