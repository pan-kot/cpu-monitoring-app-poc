import { Settings, History, Tick, Events } from '../types';

import EventGenerator from './event-generator';
import MonitorOs from './monitor-os';

type Listener = (tick: Tick) => void;

export default class Monitor {
  // Array of average CPU loads taken for each tick interval.
  private values: number[];
  // Current value index never exceeding values length.
  private current: number;
  // Events per tick within max interval.
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

  private run(interval: number) {
    setInterval(() => {
      const length = this.values.length;

      const value = this.os.averageCpuLoad;

      this.current = this.current + 1 < length ? this.current + 1 : 0;
      this.values[this.current] = value;
      delete this.events[this.current];

      const event = this.eventGenerator.next(value);
      if (event) {
        this.events[this.current] = event;
      }

      this.listeners.forEach(listener => listener({ value, event }));
    }, interval * 1000);
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
