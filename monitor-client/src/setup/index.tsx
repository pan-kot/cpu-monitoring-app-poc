import ThemeSetup from './Theme';

type TSetupProps = {
  children: React.ReactNode;
};

export default function Setup({ children }: TSetupProps) {
  return <ThemeSetup>{children}</ThemeSetup>;
}
