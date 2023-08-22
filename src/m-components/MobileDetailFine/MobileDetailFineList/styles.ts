import { DefaultTheme } from '@/styles/Theme';
import { Situation } from '@/types/event';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

export const MOBILESITUATIONSTATUSSTYLES = {
  미납: (theme: DefaultTheme) => css`
    color: ${theme.colors.red_400};
    background-color: ${theme.colors.red_200};
  `,
  확인중: (theme: DefaultTheme) => css`
    color: ${theme.colors.orange_600};
    background-color: ${theme.colors.orange_200};
  `,
  완납: (theme: DefaultTheme) => css`
    color: ${theme.colors.primary_400};
    background-color: ${theme.colors.blue_200};
  `,
};

export const DetailFineListContainer = styled.ul`
  position: relative;

  padding: 0.75rem 1rem 0;

  height: calc(100vh - 243px);

  overflow-y: auto;
`;

export const DateText = styled.p`
  padding-top: 1rem;
  ${({ theme }) => theme.font.body_01};
  color: ${({ theme }) => theme.colors.secondary_500};
`;

export const DetailFineItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.675rem;
  padding: 0.625rem 0;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  padding-right: 0.5rem;
`;

export const UserInfoText = styled.p`
  ${({ theme }) => theme.font.subhead_01};
  color: ${({ theme }) => theme.colors.secondary_900};
`;

export const SituationBox = styled.div<{ situationType: Situation }>`
  display: flex;
  align-items: center;
  padding-right: 0.125rem;
  ${({ theme }) => css`
    border-radius: 0.25rem;
    background-color: ${theme.colors.blue_200};
    color: ${theme.colors.primary_600};
  `}
  ${({ theme }) => theme.font.caption};

  ${({ theme, situationType }) => situationType && MOBILESITUATIONSTATUSSTYLES[situationType](theme)}
`;

export const DetailContextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const AmountText = styled.p`
  margin-left: auto;
  ${({ theme }) => theme.font.subhead_02};
  color: ${({ theme }) => theme.colors.secondary_800};
`;

export const TopWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;

  padding: 0 0.25rem;
`;
export const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 0.125rem;
`;

export const DescriptionGround = styled.span`
  ${({ theme }) => theme.font.caption};

  color: ${({ theme }) => theme.colors.secondary_600};
`;
export const Division = styled.div`
  width: 1px;
  height: 10px;

  background-color: ${({ theme }) => theme.colors.neutral_400_b};
`;
export const DescriptionMemo = styled.span`
  ${({ theme }) => theme.font.caption};

  color: ${({ theme }) => theme.colors.secondary_500};
  white-space: nowrap;
`;

export const CheckboxWrapper = styled.div`
  padding-left: 0.5rem;
  padding-right: 0.75rem;
`;
