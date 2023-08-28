import { SituationStatus } from '@/types/notification';
import styled from '@emotion/styled';
import { Situation } from '@/types/event';
import { DefaultTheme } from '@/styles/Theme';
import { css } from '@emotion/react';
import { isMobile } from 'react-device-detect';

export const TextContainer = styled.div`
  padding: 0 0.5rem;
`;

export const Title = styled.h2`
  ${isMobile && 'margin-top: 1.25rem;'}
  padding-bottom: 0.5rem;
  ${({ theme }) => (isMobile ? theme.font.subhead_03 : theme.font.subhead_04)};

  color: ${({ theme }) => theme.colors.secondary_800};
`;

export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  padding-bottom: 0.75rem;
`;

export const ProfimeText = styled.p`
  ${({ theme }) => (isMobile ? theme.font.subhead_03 : theme.font.subhead_04)};

  color: ${({ theme }) => theme.colors.secondary_800};
`;

export const Description = styled.p`
  padding-bottom: 0.125rem;

  ${({ theme }) => theme.font.body_01};

  color: ${({ theme }) => theme.colors.secondary_600};
`;

export const SubTitle = styled.p`
  padding-bottom: 0.5rem;
  ${({ theme }) => (isMobile ? theme.font.body_01 : theme.font.body_03)};

  color: ${({ theme }) => theme.colors.secondary_900};
`;

export const SITUATION_USERLINESTYLES = {
  미납: (theme: DefaultTheme) => css`
    color: ${theme.colors.red_400};
  `,
  확인중: (theme: DefaultTheme) => css`
    color: ${theme.colors.orange_600};
  `,
  완납: (theme: DefaultTheme) => css`
    color: ${theme.colors.primary_400};
  `,
};

export const UserLineSpan = styled.span<{ $situation: Situation }>`
  text-decoration: underline;
  ${({ theme, $situation }) => SITUATION_USERLINESTYLES[$situation](theme)};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;

  position: absolute;

  bottom: 0;
  right: 0;
  left: 0;

  padding: 0 24px;
  padding-bottom: 48px;

  background-color: white;
`;

export const Button = styled.button<{ isSubmit?: boolean }>`
  flex: 1;
  padding: 11px 0;

  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.secondary_800};
  border-radius: 0.25rem;

  ${({ theme }) => theme.font.subhead_02};

  ${({ isSubmit, theme }) =>
    isSubmit &&
    css`
      background-color: ${theme.colors.secondary_800};
      color: ${theme.colors.secondary_100};
    `}
`;

export const DatePeriodContainer = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 8px;
  ${({ theme }) => theme.font.body_01};
`;

export const DatePeriodText = styled.p`
  ${({ theme }) => theme.font.body_02};

  color: ${({ theme }) => theme.colors.secondary_600};
  font-size: 0.875rem;
`;

export const TotalAmount = styled.p`
  ${({ theme }) => theme.font.subhead_02};

  color: ${({ theme }) => theme.colors.secondary_900};
`;
