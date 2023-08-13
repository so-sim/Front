import styled from '@emotion/styled';

export const MemberList = styled.ul`
  margin-top: 4px;
`;

export const MemberListItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.subhead_01};
`;
