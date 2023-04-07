import styled from '@emotion/styled';

export const DetailFineFrame = styled.section`
  border-left: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
  height: calc(100vh - 68px);
  overflow: auto;
`;

export const DetailContent = styled.div`
  padding: 28px 32px;
  min-width: 784px;
`;
