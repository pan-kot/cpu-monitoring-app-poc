import styled from 'styled-components';

export default function AlertsBar() {
  return <Container></Container>;
}

const Container = styled.div`
  width: 100%;
  height: 60px;

  padding: 8px;

  background-color: rgba(0, 0, 0, 0.05);

  border-radius: 2px;

  box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.16);
`;
