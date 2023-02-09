import styled from '@emotion/styled';

export const Header = styled.header`
  width: 100%;
  height: 68px;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  div {
    cursor: pointer;
  }
  button {
    position: relative;
  }
`;

export const GridLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 100px 240px auto;
`;

export const Test = styled.div`
  border: 2px solid #3c3c3c;
  border-radius: 4px;
  height: 32px;
  position: relative;
  width: 112px;
`;
