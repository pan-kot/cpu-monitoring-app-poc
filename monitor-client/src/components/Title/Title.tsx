import styled from 'styled-components';

import i18n from '../../i18n';

type TProps = {
  current: number | null;
};

export default function Title({ current }: TProps) {
  return (
    <Card>
      <div>{i18n.title.label}</div>
      <div>{(current || 0).toFixed(2)}</div>
    </Card>
  );
}

const Card = styled.div`
  width: 100%;
  height: 60px;

  padding: 8px 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 24px;

  background-color: ${props => props.theme.card.bg};

  border-radius: ${props => props.theme.card.radius};

  box-shadow: ${props => props.theme.card.shadow};
`;
