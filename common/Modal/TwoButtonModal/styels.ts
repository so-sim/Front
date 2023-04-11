import styled from '@emotion/styled';

export const Title = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 32px;
`;

export const Desc = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: pre;
  margin-top: 12px;
  ${({ theme }) => theme.font.body_03}
`;
