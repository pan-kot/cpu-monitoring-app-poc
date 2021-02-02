import 'styled-components';

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
      threshold: {
        stroke: string;
      };
      curve: {
        area: string;
        stroke: string;
      };
      event: {
        highLoad: {
          dot: string;
        };
        recovery: {
          dot: string;
        };
      };
    };
  }
}
