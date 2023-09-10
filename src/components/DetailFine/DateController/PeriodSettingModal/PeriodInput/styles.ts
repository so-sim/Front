import styled from '@emotion/styled';

export const Subtitle = styled.div`
  margin-bottom: 2px;
  ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.body_01}
`;

export const PeriodInput = styled.div`
  padding: 4px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 88px;
  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.caption};
  cursor: pointer;
`;
