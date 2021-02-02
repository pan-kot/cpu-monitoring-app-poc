import { EventType } from '../types';

import EventGenerator from './event-generator';

describe('EventGenerator', () => {
  it('should not produce high-load events if there is no continuous sequence of high values', () => {
    const generator = new EventGenerator(
      { value: 1, ticks: 3 },
      { value: 1, ticks: 3 }
    );

    const events = [
      generator.next(1.01),
      generator.next(1.01),
      generator.next(0.99),
      generator.next(1.01),
      generator.next(1.01)
    ].filter(Boolean);

    expect(events).toHaveLength(0);
  });

  it('should produce high-load events for each continuous sequence of high values of threshold length', () => {
    const generator = new EventGenerator(
      { value: 1, ticks: 3 },
      { value: 1, ticks: 3 }
    );

    const events = [
      generator.next(1.01),
      generator.next(1.01),
      generator.next(1.01), // HIGH_LOAD
      generator.next(1.01),
      generator.next(1.01),
      generator.next(1.01), // HIGH_LOAD
      generator.next(1.01),
      generator.next(0.99),
      generator.next(1.01),
      generator.next(1.01),
      generator.next(1.01) // HIGH_LOAD
    ];

    expect(events.filter(Boolean)).toHaveLength(3);
    expect(events[2]).toBe(EventType.HIGH_LOAD);
    expect(events[5]).toBe(EventType.HIGH_LOAD);
    expect(events[10]).toBe(EventType.HIGH_LOAD);
  });

  it('should not produce recovery events if high-load was not met', () => {
    const generator = new EventGenerator(
      { value: 1, ticks: 3 },
      { value: 1, ticks: 3 }
    );

    const events = [
      generator.next(1.01),
      generator.next(0.01),
      generator.next(0.01),
      generator.next(0.01),
      generator.next(0.01)
    ].filter(Boolean);

    expect(events).toHaveLength(0);
  });

  it('should produce exactly one recovery event once recovered after high-load', () => {
    const generator = new EventGenerator(
      { value: 1, ticks: 2 },
      { value: 1, ticks: 3 }
    );

    const events = [
      generator.next(1.01),
      generator.next(1.01), // HIGH_LOAD
      generator.next(1.01),
      generator.next(1.01), // HIGH_LOAD
      generator.next(0.99),
      generator.next(0.99),
      generator.next(0.99), // RECOVERY
      generator.next(0.99),
      generator.next(0.99),
      generator.next(0.99)
    ];

    expect(events.filter(Boolean)).toHaveLength(3);
    expect(events[6]).toBe(EventType.RECOVERY);
  });
});
