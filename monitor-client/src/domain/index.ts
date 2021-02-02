import {
  EventType,
  Connect,
  Connected,
  Tick,
  Settings,
  Threshold,
  History,
  Events
} from '@andrei-zhaleznichenka/cpu-monitor-agent-api';

export { EventType };

export type { Connect, Connected, Tick, Settings, Threshold, History, Events };

export type TimeValue = {
  offset: number;
  value: number;
  event: null | EventType;
};
