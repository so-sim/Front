import styled from '@emotion/styled';

import { SituationButtonStyles } from '@/components/DetailFine/AlarmRequest_PaymentUpdate/SituationButton/styles';
import { Situation } from '@/types/event';

export const AlarmCardContainer = styled.div`
  padding: 0.75rem;

  border: 1px solid ${({ theme }) => theme.colors.neutral_300_b};
  border-radius: 0.25rem;

  box-shadow: 0px 3px 9px 0px rgba(45, 45, 45, 0.08);

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral_200_b};
    /* opacity: 0.4; */
  }
`;

export const Header = styled.div`
  display: flex;

  align-items: center;

  padding-bottom: 0.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral_200_b};
  ${({ theme }) => theme.font.body_02};
  color: ${({ theme }) => theme.colors.secondary_700};
`;

export const AlarmTypeText = styled.div``;

export const Circle = styled.div<{ $isRead: boolean }>`
  width: 0.5rem;
  height: 0.5rem;

  margin-right: 0.5rem;
  background-color: ${({ theme, $isRead }) => ($isRead ? theme.colors.neutral_300_b : theme.colors.red_400)};

  border-radius: 9999px;
`;

export const DateTitle = styled.div`
  margin-left: auto;
`;

export const Title = styled.p`
  padding-top: 0.25rem;

  ${({ theme }) => theme.font.subhead_03};
  color: ${({ theme }) => theme.colors.secondary_900};
`;

export const GroupText = styled.p`
  padding-top: 0.5rem;

  ${({ theme }) => theme.font.subhead_02};
  color: ${({ theme }) => theme.colors.secondary_700};
`;

export const Descripttion = styled.p`
  padding-top: 0.25rem;

  ${({ theme }) => theme.font.body_02};
  color: ${({ theme }) => theme.colors.secondary_700};
`;

export const SituaionBtn = styled.button<{ situationType: Situation }>`
  ${({ theme, situationType }) => SituationButtonStyles[situationType](theme)}
`;
