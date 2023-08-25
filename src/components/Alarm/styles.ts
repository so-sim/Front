import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const AlarmIconWrapper = styled.div<{ $isCount?: boolean }>`
  position: relative;

  ${({ $isCount, theme }) =>
    $isCount &&
    css`
      &::after {
        content: attr(data-count);

        min-width: 18px;
        position: absolute;
        padding: 2px 4px;
        background-color: ${theme.colors.system_red_200};
        color: white;
        font-size: 0.875rem;
        border-radius: 1.25rem;
        text-align: center;
        top: -35%;
        left: 35%;
      }
    `}
`;
