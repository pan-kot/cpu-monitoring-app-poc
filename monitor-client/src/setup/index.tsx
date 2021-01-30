import ThemeProvider from './Theme';

import './connection';

type TSetupProps = {
  children: React.ReactNode;
};

export default function Setup({ children }: TSetupProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
