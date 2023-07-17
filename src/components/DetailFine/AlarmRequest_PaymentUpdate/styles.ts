import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const UserDetailsFrame = styled.div`
  /* userDetail 에서 값은 왜 더높음? */
  width: 460px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;

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

export const Main = styled.div`
  padding: 24px;
`;

export const Title = styled.h3`
  margin-bottom: 8px;

  margin-bottom: ${({ theme }) => theme.font.subhead_04};
`;

export const SubTitle = styled.p`
  margin-bottom: 12px;

  ${({ theme }) => theme.font.body_03};
`;

// export const SubTitleUnderLine = styled.span`
//   text-decoration: underline;
// `;

export const SituationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 24px;
`;

export const SituationButton = styled.button<{ situationType?: string; isClick?: boolean }>`
  width: 68px;

  padding: 4px;

  border-radius: 4px;

  ${({ theme }) =>
    css`
      ${theme.font.subhead_02};
      color: ${theme.colors.orange_600};
      background-color: ${theme.colors.orange_200};
      box-shadow: inset 0 0 0 2px ${theme.colors.orange_600};
    `};

  ${({ situationType, theme }) =>
    situationType &&
    css`
      color: ${theme.colors.secondary_500};
      background-color: ${theme.colors.secondary_100};
      box-shadow: inset 0 0 0 2px ${theme.colors.secondary_500};
    `}

  ${({ situationType, isClick, theme }) =>
    situationType === '미납' &&
    isClick &&
    css`
      color: ${theme.colors.red_400};
      background-color: ${theme.colors.red_200};
      box-shadow: inset 0 0 0 2px ${theme.colors.red_400};
    `}
  ${({ situationType, isClick, theme }) =>
    situationType === '완납' &&
    isClick &&
    css`
      color: ${theme.colors.primary_400};
      background-color: ${theme.colors.blue_200};
      box-shadow: inset 0 0 0 2px ${theme.colors.primary_400};
    `}
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

export const DatePeriodContainer = styled.div`
  margin-bottom: 8px;
  ${({ theme }) => theme.font.body_01};
`;

export const ListContainer = styled.ul`
  ${({ theme }) => theme.font.body_02};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;

  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;

  margin-bottom: 48px;
  padding: 0 24px;
`;

export const Button = styled.button<{ isSubmit?: boolean }>`
  width: 200px;
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

export const BackDrop = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  background-color: #2d2d2d;
  opacity: 30%;

  z-index: 9998;
`;
