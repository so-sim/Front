import styled from '@emotion/styled';

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h2`
  ${({ theme }) => theme.font.subhead_04};

  color: ${({ theme }) => theme.colors.secondary_800};
`;

export const ReadAllAlarmsText = styled.p<{ $hasItem: boolean }>`
  float: right;
  ${({ theme }) => theme.font.subhead_02};

  color: ${({ $hasItem, theme }) => ($hasItem ? theme.colors.secondary_800 : theme.colors.secondary_500)};
`;

export const AlarmListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const EmptyIconWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  padding: 6.25rem;
`;

export const EmptyText = styled.p`
  ${({ theme }) => theme.font.subhead_03};

  color: ${({ theme }) => theme.colors.secondary_500};
`;
