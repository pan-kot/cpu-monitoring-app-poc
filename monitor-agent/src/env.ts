import dotenv from 'dotenv';

import { Settings } from './types';

export const isProduction = process.env.NODE_ENV === 'production';

dotenv.config();

// Falling back to sample configuration if .env is not defined.
if (!isProduction) {
  dotenv.config({ path: '.env.local' });
}

export const port = getInt('PORT', 3001);

export const settings: Settings = {
  tickInterval: getInt('TICK_INTERVAL_SECONDS', 10),
  maxTicks: getInt('MAX_TICKS', 60),
  highLoadThreshold: getTreshold('HIGH_LOAD_THRESHOLD'),
  recoveryThreshold: getTreshold('RECOVERY_THRESHOLD')
};

function getInt(key: string, defaultValue: number): number {
  const property = process.env[key];

  return property ? parseInt(property, 10) : defaultValue;
}

function getTreshold(key: string) {
  const value = getInt(`${key}_VALUE`, 1);
  const ticks = getInt(`${key}_TICKS`, 12);

  return { value, ticks };
}
