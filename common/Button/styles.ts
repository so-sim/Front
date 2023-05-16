import { ButtonProps } from './index';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export const Button = styled.button<ButtonProps>`
  ${({ theme }) => theme.font.subhead_02};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) =>
    props.color === 'white' ? `1px solid ${props.theme.colors.secondary_800}` : props.color === 'white-disabled' ? `1px solid ${props.theme.colors.neutral_400_b}` : 'none'};
  background-color: ${({ theme, color }) => {
    const colors = {
      primary: theme.colors.primary_500,
      disabled: theme.colors.secondary_200,
      black: theme.colors.secondary_800,
      white: theme.colors.secondary_100,
      ['white-disabled']: theme.colors.secondary_100,
    };
    return colors[color ?? 'primary'];
  }};
  color: ${({ theme, color }) => {
    const colors = {
      primary: theme.colors.secondary_100,
      disabled: theme.colors.secondary_700,
      black: theme.colors.secondary_100,
      white: theme.colors.secondary_900,
      ['white-disabled']: theme.colors.secondary_600,
    };
    return colors[color ?? 'primary'];
  }};
  &:hover {
    background-color: ${({ theme, color }) => {
      const colors = {
        primary: theme.colors.primary_600,
        disabled: theme.colors.secondary_200,
        black: theme.colors.secondary_900,
        white: theme.colors.neutral_200_b,
        ['white-disabled']: theme.colors.secondary_100,
      };
      return colors[color ?? 'primary'];
    }};
  }
  :disabled {
    cursor: default;
  }
`;

export const InnerText = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Icon = styled.span`
  height: 16px;
`;

const loading = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;
const circleAnimation = keyframes`
  0% {
    stroke-dashoffset: 56;
  }
  75% {
    stroke-dashoffset: -36;
  }
  100% {
    stroke-dashoffset: -56;
  }
`;

export const LoadingCircle = styled.svg<Pick<ButtonProps, 'color'>>`
  width: 24px;
  height: 24px;
  animation: ${loading} 3s infinite;
  circle {
    stroke: ${({ theme, color }) => {
      const colors = {
        primary: theme.colors.secondary_100,
        disabled: theme.colors.secondary_700,
        black: theme.colors.secondary_100,
        white: theme.colors.secondary_900,
        ['white-disabled']: theme.colors.secondary_600,
      };
      return colors[color ?? 'primary'];
    }};
    stroke-width: 2;
    stroke-dasharray: 56;
    stroke-dashoffset: 0;
    fill: none;
    animation: ${circleAnimation} 1s infinite;
  }
`;
