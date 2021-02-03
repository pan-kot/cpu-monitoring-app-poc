import React from 'react';
import {
  createGlobalStyle,
  ThemeProvider,
  DefaultTheme
} from 'styled-components';

import { EventType } from '../domain';

type TThemeSetupProps = {
  children: React.ReactNode;
};

export default function ThemeSetup({ children }: TThemeSetupProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      {children}
    </ThemeProvider>
  );
}

const theme: DefaultTheme = {
  body: {
    fg: '#495458',
    bg: '#e8e9eb'
  },
  card: {
    bg: '#ffffff',
    shadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.16)',
    radius: '2px'
  },
  chart: {
    bg: '#fafafa',
    grid: {
      stroke: '#e0e0e0'
    },
    threshold: {
      stroke: '#d94750'
    },
    curve: {
      area: 'rgba(188, 80, 144, 0.15)',
      stroke: '#bc5090'
    },
    cursor: {
      stroke: '#495458'
    },
    offline: {
      overlay: 'rgba(255,255,255, 0.50)'
    }
  },
  event: {
    [EventType.HIGH_LOAD]: '#d94750',
    [EventType.RECOVERY]: '#52aa57'
  }
};

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    height: 100%
  }

  body {
    min-width: 600px;
    max-width: 1200px;
    width: calc(100% - 100px);
    height: calc(100% - 100px);

    margin: 50px auto 50px auto;

    padding: 0;

    font-size: 14px;
    font-family: Lato;
    color: ${props => props.theme.body.fg};

    background: ${props => props.theme.body.bg};
  }

  #root {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
