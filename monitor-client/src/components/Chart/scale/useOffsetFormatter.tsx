import { useCallback } from 'react';

import { Settings } from '../../../domain';

type TProps = {
  settings: Settings;
};

export default function useOffsetFormatter({ settings }: TProps) {
  return useCallback(
    offset => {
      const offsetSeconds = offset * settings.tickInterval;

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
}
