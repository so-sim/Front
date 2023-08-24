import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const AlarmIconWrapper = styled.div<{ $isCount?: boolean }>`
  position: relative;

  ${({ $isCount }) =>
    $isCount &&
    css`
      &::after {
        content: attr(data-count);

        position: absolute;
        padding: 2px 9px;
        background-color: red;
        color: white;
        border-radius: 1.25rem;
        top: -50%;
        left: 25%;
      }
    `}
`;
