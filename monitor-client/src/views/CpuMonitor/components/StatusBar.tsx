import styled from 'styled-components';

export default function StatusBar() {
  return (
    <Container>
      <div>CPU Monitor</div>
      <div>10m</div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 60px;

  padding: 8px 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 24px;
  color: #495458;

  background-color: #ffffff;

  border-radius: 2px;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.16);
`;
