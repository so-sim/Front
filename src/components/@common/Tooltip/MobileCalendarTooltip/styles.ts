import { Desc } from '../../Modal/ConfirmModal/styels';
import styled from '@emotion/styled';
import { Situation } from '@/types/event';
import { MOBILE_SITUATION_STATUS_STYLES } from '@/m-components/MobileDetailFine/MobileDetailFineList/styles';
import { css } from '@emotion/react';

export const Row = styled.div`
  display: flex;
  align-items: center;
  color: white;
  gap: 8px;
  ${({ theme }) => theme.font.body_02};
`;

export const Subhead = styled.div`
  ${({ theme }) => theme.font.subhead_02};
  margin-bottom: 8px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.secondary_100};
`;

export const Body = styled.div`
  text-align: start;
  color: white;
  margin-bottom: 12px;
  ${({ theme }) => theme.font.body_02};
`;

export const Asterisk = styled.span`
  color: ${({ theme }) => theme.colors.system_red_200};
  ${({ theme }) => theme.font.subhead_02}
`;

export const Asterisk2 = styled(Asterisk)`
  margin-left: -8px;
`;

export const DescWrapper = styled.div`
  width: 100%;
  white-space: pre-wrap;
  text-align: start;
  color: ${({ theme }) => theme.colors.secondary_400};
  ${({ theme }) => theme.font.body_01};
  display: flex;
  align-items: center;
`;

export const SituationBox = styled.span<{ situationType: Situation }>`
  display: inline-flex;
  width: fit-content;
  align-items: center;
  vertical-align: middle;
  height: 100%;
  padding-right: 0.125rem;
  ${({ theme }) => css`
    border-radius: 0.25rem;
    background-color: ${theme.colors.blue_200};
    color: ${theme.colors.primary_600};
  `}
  ${({ theme }) => theme.font.caption};

  ${({ theme, situationType }) => situationType && MOBILE_SITUATION_STATUS_STYLES[situationType](theme)}
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;

  padding: 0 0.25rem 0.125rem 0.25rem;
`;

export const DescriptionWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;
