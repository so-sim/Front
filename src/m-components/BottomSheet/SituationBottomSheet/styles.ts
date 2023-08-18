import styled from '@emotion/styled';

export const SituationList = styled.ul`
  margin-top: 4px;
`;

export const SituationListItem = styled.li`
  padding: 1rem 0 1rem 0.75rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.subhead_01};
`;
