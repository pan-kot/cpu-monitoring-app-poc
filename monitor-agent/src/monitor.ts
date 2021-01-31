import os from 'os';

import { EventType, Settings, Threshold, History, Tick, Events } from './types';

type Listener = (tick: Tick) => void;

export default class Monitor {
  // Number of logical CPU cores.
  numCpus: number;
  // Tick interval in seconds.
  tickInterval: number;
  // Max number of ticks to persist.
  maxTicks: number;
  // Threshold to trigger HIGH_LOAD event.
  highLoadThreshold: Threshold;
  // Threshold to trigger RECOVERY event.
  recoveryThreshold: Threshold;

  private listeners: Listener[] = [];

  // Array of average CPU loads taken for each tick interval.
  private values: number[];
  // Indexes the values array never exceeding its length.
  private currentTick: number = 0;

  // Tracks sequential high-load or recovery ticks.
  // Positive values indicate high load and negative ones - recovery.
  // The event of either type is emitted when the counter hits the tick threshold.
  private loadCounter: number = 0;
  // Indicates that recovery event is expected when recovery threshold is met.
  private recoveryExpected: boolean = false;
  // Stores events per tick removing those exceeding the tick interval.
  private events: Events = {};

  constructor(settings: Settings) {
    this.validateSettings(settings);

    this.tickInterval = settings.tickInterval;
    this.maxTicks = settings.maxTicks;
    this.highLoadThreshold = settings.highLoadThreshold;
    this.recoveryThreshold = settings.recoveryThreshold;

    this.numCpus = os.cpus().length;

    this.values = Array(settings.maxTicks);

    this.run();
  }

  // Returns all persisted values and events in a consumable form.
  get history(): History {
    const values = [];
    let tick = this.currentTick;

    // Taking maxTicks last values going backwards from the current tick.
    for (let i = 0; i < this.maxTicks; i += 1) {
      tick = tick > 0 ? tick - 1 : this.maxTicks - 1;

      if (this.values[tick] !== undefined) {
        values.push(this.values[tick]);
      }
    }

    // Recent-most ticks should come first.
    values.reverse();

    const events = this.events;

    return { values, events };
  }

  subscribe(newListener: Listener) {
    this.listeners.push(newListener);
  }

  unsubscribe(listenerToRemove: Listener) {
    this.listeners = this.listeners.filter(it => it !== listenerToRemove);
  }

  private validateSettings(settings: Settings) {
    if (settings.tickInterval <= 0) {
      throw new Error('Argument Error: tick interval must be > 0.');
    }

    if (settings.maxTicks <= 0) {
      throw new Error('Argument Error: max ticks must be > 0.');
    }

    if (settings.highLoadThreshold.value <= 0) {
      throw new Error('Argument Error: max load threshold value must be > 0.');
    }
    if (settings.highLoadThreshold.ticks <= 0) {
      throw new Error('Argument Error: max load threshold ticks must be > 0.');
    }

    if (settings.recoveryThreshold.value <= 0) {
      throw new Error('Argument Error: recovery threshold value must be > 0.');
    }
    if (settings.recoveryThreshold.ticks <= 0) {
      throw new Error('Argument Error: recovery threshold ticks must be > 0.');
    }
  }

  private run() {
    setInterval(() => {
      const value = os.loadavg()[0] / this.numCpus;

      const event = this.updateState(value);

      this.listeners.forEach(listener => listener({ value, event }));
    }, this.tickInterval * 1000);
  }

  private updateState(averageCpuLoad: number): EventType | null {
    this.values[this.currentTick] = averageCpuLoad;

    const event = this.updateEvents(averageCpuLoad);

    this.currentTick =
      this.currentTick + 1 < this.maxTicks ? this.currentTick + 1 : 0;

    return event;
  }

  private updateEvents(averageCpuLoad: number) {
    // Removing events that are out of persistence range.
    delete this.events[this.currentTick];

    this.updateLoadCounter(averageCpuLoad);

    const highLoadTicks = this.highLoadThreshold.ticks;
    const recoveryTicks = this.recoveryThreshold.ticks;

    if (this.loadCounter === highLoadTicks) {
      const event = EventType.HIGH_LOAD;
      this.events[this.currentTick] = event;

      this.loadCounter = 0;
      this.recoveryExpected = true;

      return event;
    }

    if (this.recoveryExpected && this.loadCounter === -recoveryTicks) {
      const event = EventType.RECOVERY;
      this.events[this.currentTick] = event;

      this.loadCounter = 0;
      this.recoveryExpected = false;

      return event;
    }

    return null;
  }

  private updateLoadCounter(averageCpuLoad: number) {
    const highLoadValue = this.highLoadThreshold.value;
    const recoveryValue = this.recoveryThreshold.value;

    if (this.loadCounter >= 0 && averageCpuLoad >= highLoadValue) {
      this.loadCounter += 1;
    } else if (this.loadCounter <= 0 && averageCpuLoad < recoveryValue) {
      this.loadCounter -= 1;
    } else {
      this.loadCounter = 0;
    }
  }
}
