import { Situation } from '@/types/event';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { DefaultTheme } from '@/styles/Theme';

export const SituationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 24px;
`;

export const SituationButtonStyles = {
  미납: (theme: DefaultTheme) => css`
    color: ${theme.colors.red_400};
    background-color: ${theme.colors.red_200};
    box-shadow: inset 0 0 0 2px ${theme.colors.red_400};
  `,
  확인중: (theme: DefaultTheme) => css`
    color: ${theme.colors.orange_600};
    background-color: ${theme.colors.orange_200};
    box-shadow: inset 0 0 0 2px ${theme.colors.orange_600};
  `,
  완납: (theme: DefaultTheme) => css`
    color: ${theme.colors.primary_400};
    background-color: ${theme.colors.blue_200};
    box-shadow: inset 0 0 0 2px ${theme.colors.primary_400};
  `,
};

export const SituationButton = styled.button<{ situationType: Situation; isClick?: boolean }>`
  width: 68px;

  padding: 4px;

  border-radius: 4px;

  ${({ theme }) =>
    css`
      ${theme.font.subhead_02};
    `};

  ${({ theme, situationType }) => SituationButtonStyles[situationType](theme)}

  ${({ situationType, isClick, theme }) =>
    situationType &&
    isClick === false &&
    css`
      color: ${theme.colors.secondary_500};
      background-color: ${theme.colors.secondary_100};
      box-shadow: inset 0 0 0 2px ${theme.colors.secondary_500};
    `}

  ${({ situationType, isClick, theme }) => situationType === '미납' && isClick && SituationButtonStyles[situationType](theme)}
  ${({ situationType, isClick, theme }) => situationType === '완납' && isClick && SituationButtonStyles[situationType](theme)}
`;

export const Arrow = styled.div`
  position: relative;

  width: 12px;
  height: 12px;

  margin: 0 4px;
  border-width: 2px 2px 0 0;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.secondary_400};

  transform: rotate(45deg);

  &:before {
    content: '';
    position: absolute;
    right: 0;
    top: -1.5px;

    width: 14px;
    height: 2px;

    box-shadow: inset 0 0 0 32px ${({ theme }) => theme.colors.secondary_400};

    transform: rotate(-45deg);
    transform-origin: right top;
  }
`;
