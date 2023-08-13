import styled from '@emotion/styled';

export const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding-bottom: 24px;
  ${({ theme }) => theme.font.subhead_03};
`;

export const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;
