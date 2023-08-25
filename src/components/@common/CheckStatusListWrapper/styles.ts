import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.div<{ $checked?: boolean; $disabled?: boolean }>`
  width: 100%;

  border-radius: 0.5rem;

  background-color: ${({ theme }) => theme.colors.secondary_100};
  ${({ $disabled, theme }) =>
    !$disabled &&
    css`
      &:hover {
        background-color: ${theme.colors.neutral_200_b};
      }
    `}

  background-color: ${({ $checked, theme }) => $checked && `#f2f7fe`};

  background-color: ${({ $disabled, theme }) => $disabled && theme.colors.secondary_400};
`;
