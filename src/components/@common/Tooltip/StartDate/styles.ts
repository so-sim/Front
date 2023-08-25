import styled from '@emotion/styled';

export const Body = styled.div`
  white-space: pre-wrap;
  text-align: start;
  color: ${({ theme }) => theme.colors.secondary_100};
  ${({ theme }) => theme.font.body_02};
`;
