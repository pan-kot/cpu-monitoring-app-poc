import 'styled-components';

import { EventType } from './domain';

declare module 'styled-components' {
  export interface DefaultTheme {
    body: {
      fg: string;
      bg: string;
    };
    card: {
      bg: string;
      shadow: string;
      radius: string;
    };
    chart: {
      bg: string;
      grid: {
        stroke: string;
      };
      curve: {
        area: string;
        stroke: string;
      };
      cursor: {
        stroke: string;
      };
      offline: {
        overlay: string;
      };
    };
    event: {
      [EventType.HIGH_LOAD]: string;
      [EventType.RECOVERY]: string;
    };
  }
}
