import { useMemo } from 'react';
import { scaleLinear } from '@visx/scale';

import { Settings } from '../../../domain';

import useDimensions from '../useDimensions';

type TProps = {
  settings: Settings;
  maximum: number;
};

export default function useLoadScale({ settings, maximum }: TProps) {
  const { yMax } = useDimensions();

  return useMemo(() => {
    const maxLoad = Math.max(maximum, settings.highLoadThreshold.value * 2);

    return scaleLinear({
      domain: [0, maxLoad],
      range: [yMax, 0],
      round: true
    });
  }, [settings.highLoadThreshold.value, maximum, yMax]);
}
