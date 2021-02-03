import { useMemo } from 'react';

import { Settings } from '../../../domain';

type TProps = {
  settings: Settings;
};

export default function useOffsetTicks({ settings }: TProps) {
  return useMemo(() => {
    const { tickInterval, maxTicks } = settings;

    const intervalsPerMinute = 60 / tickInterval;
    const totalMinutes = Math.floor(maxTicks / intervalsPerMinute);

    const ticks = [];

    for (let i = 0; i <= totalMinutes; i++) {
      ticks.push(-i * intervalsPerMinute);
    }

    return ticks;
  }, [settings.maxTicks, settings.tickInterval]);
}
