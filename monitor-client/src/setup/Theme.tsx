import { createGlobalStyle } from 'styled-components';

type TThemeProviderProps = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: TThemeProviderProps) {
  return (
    <>
      <GlobalStyle />

      {children}
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    height: 100%
  }

  body {
    width: 900px;
    height: calc(100% - 100px);

    margin: 50px auto 50px auto;

    padding: 0;

    font-size: 14px;
    font-family: sans-serif;
    color: rgba(0, 0, 0, 0.75);

    background: #E8E9EB;
  }

  #root {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
