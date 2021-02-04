import { Settings, History, Tick, Events } from '../types';

import EventGenerator from './event-generator';
import MonitorOs from './monitor-os';

type Listener = (tick: Tick) => void;

// Creates a process for accessing CPU load data every tick interval
// and maintains one frame of load values and events.
export default class Monitor {
  // Array of average CPU loads taken for each tick interval.
  private values: number[];
  // Current value index never exceeding values length.
  private current: number;
  // Events per tick within frame size.
  private events: Events;

  private os: MonitorOs;
  private eventGenerator: EventGenerator;
  private listeners: Listener[];

  constructor(settings: Settings) {
    this.validateSettings(settings);

    this.values = Array(settings.maxTicks + 1);
    this.current = -1;
    this.events = {};

    this.os = new MonitorOs();
    this.eventGenerator = new EventGenerator(
      settings.highLoadThreshold,
      settings.recoveryThreshold
    );
    this.listeners = [];

    this.run(settings.tickInterval);
  }

  // Returns all persisted values and events in a normalized form.
  get history(): History {
    const length = this.values.length;

    const values = Array(length);
    const events: Events = {};
    let tick = this.current;

    // Normalizing values and events by shifting current to the end.
    for (let i = length - 1; i >= 0; i -= 1) {
      if (this.values[tick] !== undefined) {
        values[i] = this.values[tick];
      }
      if (this.events[tick] !== undefined) {
        events[i] = this.events[tick];
      }

      tick = tick > 0 ? tick - 1 : length - 1;
    }

    return { values, events };
  }

  subscribe(newListener: Listener) {
    this.listeners.push(newListener);
  }

  unsubscribe(listenerToRemove: Listener) {
    this.listeners = this.listeners.filter(it => it !== listenerToRemove);
  }

  private run(intervalSeconds: number) {
    setInterval(() => {
      const length = this.values.length;
      const value = this.os.averageCpuLoad;

      // Move current to the next index or 0 if it reaches values length.
      this.current = this.current + 1 < length ? this.current + 1 : 0;

      // Update current value.
      this.values[this.current] = value;

      // Delete historical event that is now out of bounds.
      delete this.events[this.current];

      // Insert new event to the current index if available.
      const event = this.eventGenerator.next(value);
      if (event) {
        this.events[this.current] = event;
      }

      // Notify listeners.
      this.listeners.forEach(listener => listener({ value, event }));
    }, intervalSeconds * 1000);
  }

  private validateSettings(settings: Settings) {
    if (settings.tickInterval <= 0) {
      throw new Error('Argument Error: tick interval must be > 0.');
    }

    if (settings.maxTicks <= 0) {
      throw new Error('Argument Error: max ticks must be > 0.');
    }
  }
}
