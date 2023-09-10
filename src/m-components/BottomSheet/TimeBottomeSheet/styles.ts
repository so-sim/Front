import styled from '@emotion/styled';

export const TimeList = styled.ul`
  margin-top: 4px;
`;

export const TimeListItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  height: 48px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.subhead_01};
`;
