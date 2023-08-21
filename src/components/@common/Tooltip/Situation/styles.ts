import styled from '@emotion/styled';

export const Subhead = styled.div`
  ${({ theme }) => theme.font.subhead_02};
  margin-bottom: 8px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.secondary_100};
`;

export const Body = styled.div`
  ${({ theme }) => theme.font.body_02};
`;
