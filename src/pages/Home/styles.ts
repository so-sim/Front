import styled from '@emotion/styled';

export const Main = styled.main`
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
