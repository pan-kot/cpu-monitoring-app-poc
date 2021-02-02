import { EventType, Threshold } from '../types';

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

  next(averageCpuLoad: number): EventType | null {
    this.updateAccumulator(averageCpuLoad);

    const highLoadThresholdMet =
      this.accumulator === this.highLoadThreshold.ticks;
    const recoveryThresholdMet =
      this.accumulator === -this.recoveryThreshold.ticks;

    if (highLoadThresholdMet) {
      this.accumulator = 0;
      this.recoveryExpected = true;

      return EventType.HIGH_LOAD;
    }

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

    if ((inHighLoad && !nextHigh) || (inLowLoad && !nextLow)) {
      this.accumulator = 0;
    }

    if (nextHigh) {
      this.accumulator += 1;
    }

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
