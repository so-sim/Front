import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${isMobile && 'margin-top: 1.25rem'};

  padding-bottom: ${isMobile ? '0.75rem' : '1rem'};
`;

export const Title = styled.h2`
  ${({ theme }) => (isMobile ? theme.font.subhead_03 : theme.font.subhead_04)};

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
  gap: ${isMobile ? '0.5rem' : '0.75rem'};

  ${!isMobile && 'height: calc(100vh - 190px);'}

  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
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
