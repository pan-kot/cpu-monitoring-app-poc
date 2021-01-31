import ThemeProvider from './Theme';

type TSetupProps = {
  children: React.ReactNode;
};

export default function Setup({ children }: TSetupProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
