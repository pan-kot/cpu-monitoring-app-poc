import { Settings, EventType } from '../domain';

import { MonitorStore } from './monitor';

const settings: Settings = 'mock-settings' as any;

describe('MonitorStore', () => {
  it('should init properly', () => {
    const history = {
      values: [null, null, null, 1, 2, 3, 4, 5, 6, 7],
      events: { 5: EventType.HIGH_LOAD }
    };

    const monitor = new MonitorStore();

    monitor.init(settings, history);

    expect(monitor.values).toEqual(history.values);
    expect(monitor.events).toEqual(history.events);
    expect(monitor.current).toEqual(9);
    expect(monitor.maximum).toBe(7);
  });

  it('should update values on each tick', () => {
    const history = {
      values: [null, null, 3, 4, 5],
      events: {}
    };

    const monitor = new MonitorStore();

    monitor.init(settings, history);

    monitor.tick({ value: 1.1, event: null });
    monitor.tick({ value: 2.1, event: null });
    monitor.tick({ value: 3.1, event: null });
    monitor.tick({ value: 4.1, event: null });
    monitor.tick({ value: 5.1, event: null });
    monitor.tick({ value: 1.2, event: null });

    expect(monitor.current).toBe(0);
    expect(monitor.values).toEqual([1.2, 2.1, 3.1, 4.1, 5.1]);
  });

  it('should update maximum on each tick', () => {
    const history = {
      values: [1, 2, 3, 4, 5],
      events: {}
    };

    const monitor = new MonitorStore();

    monitor.init(settings, history);

    monitor.tick({ value: 4, event: null });
    expect(monitor.maximum).toBe(5);

    monitor.tick({ value: 6, event: null });
    expect(monitor.maximum).toBe(6);

    monitor.tick({ value: 7, event: null });
    expect(monitor.maximum).toBe(7);
  });

  it('should update events on each tick', () => {
    const history = {
      values: [1, 2, 3, 4, 5],
      events: { 2: EventType.HIGH_LOAD }
    };

    const monitor = new MonitorStore();

    monitor.init(settings, history);

    monitor.tick({ value: 0.5, event: null });
    monitor.tick({ value: 0.5, event: null });
    monitor.tick({ value: 0.5, event: null });
    monitor.tick({ value: 0.5, event: EventType.RECOVERY });

    expect(monitor.events).toEqual({ 3: EventType.RECOVERY });
  });

  it('should produce timeseries from normalized state', () => {
    const history = {
      values: [1, 2, 3, 4, 5],
      events: { 2: EventType.HIGH_LOAD }
    };

    const monitor = new MonitorStore();

    monitor.init(settings, history);

    expect(monitor.timeseries).toEqual([
      { offset: 0, value: 5, event: null },
      { offset: 1, value: 4, event: null },
      { offset: 2, value: 3, event: EventType.HIGH_LOAD },
      { offset: 3, value: 2, event: null },
      { offset: 4, value: 1, event: null }
    ]);
  });

  it('should produce timeseries from denormalized state', () => {
    const history = {
      values: [1, 2, 3, 4, 5],
      events: { 2: EventType.HIGH_LOAD }
    };

    const monitor = new MonitorStore();

    monitor.init(settings, history);

    monitor.tick({ value: 0.1, event: EventType.RECOVERY });
    monitor.tick({ value: 0.2, event: null });

    // current === 1
    // values === [0.1, 0.2, 3, 4, 5]
    // events === { 0: RECOVERY, 2: HIGH_LOAD }

    expect(monitor.timeseries).toEqual([
      { offset: 0, value: 0.2, event: null },
      { offset: 1, value: 0.1, event: EventType.RECOVERY },
      { offset: 2, value: 5, event: null },
      { offset: 3, value: 4, event: null },
      { offset: 4, value: 3, event: EventType.HIGH_LOAD }
    ]);
  });
});
