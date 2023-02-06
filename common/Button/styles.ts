import { ButtonProps } from './index';
import styled from '@emotion/styled';

export const Button = styled.button<ButtonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, color }) => {
    const colors = {
      primary: theme.colors.primary_500,
      disabled: theme.colors.secondary_200,
      black: theme.colors.secondary_800,
      white: theme.colors.white,
    };
    return colors[color ?? 'primary'];
  }};
  color: ${({ theme, color }) => (color === 'primary' ? theme.colors.white : theme.colors.secondary_900)};
  &:hover {
    background-color: ${({ theme, color }) => {
      const colors = {
        primary: theme.colors.primary_600,
        disabled: theme.colors.secondary_200,
        black: theme.colors.secondary_900,
        white: theme.colors.white,
      };
      return colors[color ?? 'primary'];
    }};
  }
`;
