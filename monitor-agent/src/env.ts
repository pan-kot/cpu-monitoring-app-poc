import dotenv from 'dotenv';

const isProduction = process.env.NODE_ENV === 'production';

dotenv.config();

// Falling back to sample configuration if .env is not defined.
if (!isProduction) {
  dotenv.config({ path: '.env.local' });
}

const port = getInt('PORT', 3001);

const cors = {
  origin: getString('CORS_ORIGIN', `http://localhost:${port}`)
};

// Taking environment configuration and transforming frame size
// and thresholds duration from seconds to number of ticks in respect
// to tick interval.
const settings = (() => {
  const tickInterval = getInt('TICK_INTERVAL_SECONDS', 10);
  const frameSize = getInt('FRAME_SIZE_SECONDS', 600);
  const maxTicks = Math.floor(frameSize / tickInterval);

  return {
    tickInterval,
    maxTicks,
    highLoadThreshold: getTreshold('HIGH_LOAD_THRESHOLD', tickInterval),
    recoveryThreshold: getTreshold('RECOVERY_THRESHOLD', tickInterval)
  };
})();

export default { isProduction, port, cors, settings };

function getString(key: string, defaultValue: string): string {
  const property = process.env[key];

  return property || defaultValue;
}

function getInt(key: string, defaultValue: number): number {
  const property = process.env[key];

  return property ? parseInt(property, 10) : defaultValue;
}

function getTreshold(key: string, tickInterval: number) {
  const value = getInt(`${key}_VALUE`, 1);
  const duration = getInt(`${key}_SECONDS`, 120);
  const ticks = Math.floor(duration / tickInterval);

  return { value, ticks };
}
