import { Settings } from '@andrei-zhaleznichenka/cpu-monitor-agent-api';

export {
  EventType,
  Connect,
  Connected,
  Tick,
  Settings,
  Threshold,
  History,
  Events
} from '@andrei-zhaleznichenka/cpu-monitor-agent-api';

export type Env = {
  isProduction: boolean;
  port: number;
  settings: Settings;
};
