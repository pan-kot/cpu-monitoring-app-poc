import { EventType, Threshold } from '../types';

// Defines rules for spawning events for CPU load ticks.
//
// HIGH_LOAD event is spawned for every continuous sequence of specified length
// with values all higher or equal the specified threshold.
//
// RECOVERY event is spawned for a continuos sequence of specified length
// with values less the specified threshold and only if its direct predecessor
// is of type HIGH_LOAD.
//
export default class EventGenerator {
  // Threshold to trigger HIGH_LOAD event.
  private highLoadThreshold: Threshold;
  // Threshold to trigger RECOVERY event.
  private recoveryThreshold: Threshold;

  // Tracks sequential high-load or recovery ticks.
  // Positive values indicate high load and negative ones - recovery.
  // Event of either type is emitted when accumulator hits threshold ticks.
  private accumulator: number = 0;
  // Indicates that recovery event is expected when recovery threshold is met.
  private recoveryExpected: boolean = false;

  constructor(highLoadThreshold: Threshold, recoveryThreshold: Threshold) {
    this.highLoadThreshold = this.validateThreshold(highLoadThreshold);
    this.recoveryThreshold = this.validateThreshold(recoveryThreshold);
  }

  // Accumulate next value and emit event if available.
  next(averageCpuLoad: number): EventType | null {
    this.updateAccumulator(averageCpuLoad);

    const highLoadThresholdMet =
      this.accumulator === this.highLoadThreshold.ticks;
    const recoveryThresholdMet =
      this.accumulator === -this.recoveryThreshold.ticks;

    // Fire high-load event and indicate that recovery is now expected.
    if (highLoadThresholdMet) {
      this.accumulator = 0;
      this.recoveryExpected = true;

      return EventType.HIGH_LOAD;
    }

    // Fire recovery event and indicate that recovery is no longer expected.
    if (recoveryThresholdMet && this.recoveryExpected) {
      this.accumulator = 0;
      this.recoveryExpected = false;

      return EventType.RECOVERY;
    }

    return null;
  }

  private updateAccumulator(averageCpuLoad: number) {
    const inHighLoad = this.accumulator > 0;
    const inLowLoad = this.accumulator < 0;

    const nextHigh = averageCpuLoad >= this.highLoadThreshold.value;
    const nextLow = averageCpuLoad < this.recoveryThreshold.value;

    // Discard accumulated sequence if direction changes.
    if ((inHighLoad && !nextHigh) || (inLowLoad && !nextLow)) {
      this.accumulator = 0;
    }

    // Increment high-load sequence.
    if (nextHigh) {
      this.accumulator += 1;
    }

    // Increment recovery sequence.
    if (nextLow) {
      this.accumulator -= 1;
    }
  }

  private validateThreshold(threshold: Threshold) {
    if (threshold.value <= 0) {
      throw new Error('Argument Error: threshold value must be > 0.');
    }
    if (threshold.ticks <= 0) {
      throw new Error('Argument Error: threshold ticks must be > 0.');
    }

    return threshold;
  }
}
