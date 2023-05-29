import styled from '@emotion/styled';

export const NotFoundGroupFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  div {
    ${({ theme }) => theme.font.subhead_04}
    margin-bottom: 32px;
  }
`;
