import { DefaultTheme } from '@/styles/Theme';
import { Situation } from '@/types/event';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

export const UserDetailsFrame = styled.div`
  /* userDetail 에서 값은 왜 더높음? */
  width: 460px;
  position: absolute;
  top: 4.25rem;
  bottom: 0;
  right: 0;
  z-index: 8;

  box-shadow: 2px 0px 25px 7px rgba(156, 156, 156, 0.15);
  border-left: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  border-left: gray;

  background: white;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;

  padding: 12px 24px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral_200_b};

  & > span {
    ${({ theme }) => theme.font.subhead_02};
  }
`;

export const CloseIcon = styled.span`
  height: 24px;
  margin-right: 4px;
  cursor: pointer;
`;

export const Main = styled.div<{ $isMobile: boolean }>`
  padding: ${({ $isMobile }) => ($isMobile ? '24px 0' : '24px')};
`;

export const Title = styled.h3`
  margin-bottom: 8px;

  margin-bottom: ${({ theme }) => theme.font.subhead_04};
`;

export const SubTitle = styled.p`
  margin-bottom: 12px;

  ${({ theme }) => theme.font.body_03};
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

export const ListContainer = styled.ul`
  ${({ theme }) => theme.font.body_02};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;

  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;

  margin-bottom: 48px;
  padding: 0 24px;
`;

export const Button = styled.button<{ isSubmit?: boolean }>`
  flex: 1;
  padding: 11px 0;

  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.secondary_800};
  border-radius: 0.25rem;

  color: ${({ theme }) => theme.colors.secondary_900};

  ${({ theme }) => theme.font.subhead_02};

  ${({ isSubmit, theme }) =>
    isSubmit &&
    css`
      background-color: ${theme.colors.secondary_800};
      color: ${theme.colors.secondary_100};
    `}
`;

export const BackDrop = styled.div`
  position: absolute;
  top: 4.25rem;
  bottom: 0;
  right: 0;
  left: 0;

  background-color: white;
  opacity: 30%;

  z-index: 7;
`;
