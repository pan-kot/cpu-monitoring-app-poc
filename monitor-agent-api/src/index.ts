// Enums

export enum EventType {
  HIGH_LOAD = 'HIGH_LOAD',
  RECOVERY = 'RECOVERY'
}

// Commands

export type Connect = {};

// Events

export type Connected = {
  settings: Settings;
  history: History;
};

export type Tick = {
  value: number;
  event: null | EventType;
};

// DTOs

export type Settings = {
  tickInterval: number;
  maxTicks: number;
  highLoadThreshold: Threshold;
  recoveryThreshold: Threshold;
};

export type Threshold = {
  value: number;
  ticks: number;
};

export type History = {
  values: (null | number)[];
  events: Events;
};

export type Events = {
  [tick: number]: EventType;
};
