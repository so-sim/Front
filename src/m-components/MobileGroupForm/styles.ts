import styled from '@emotion/styled';

export const GroupTypeListItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
  ${({ theme }) => theme.font.subhead_02};
  color: ${({ theme }) => theme.colors.secondary_900};
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
`;
