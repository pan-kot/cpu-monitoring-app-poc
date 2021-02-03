import { useCallback } from 'react';

import i18n from '../../../i18n';
import { Settings } from '../../../domain';

type TProps = {
  settings: Settings;
};

export default function useOffsetFormatter({ settings }: TProps) {
  return useCallback(offset => i18n.duration(offset * settings.tickInterval), [
    settings.tickInterval
  ]);
}
