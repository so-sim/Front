import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Title = styled.div<{ $isMobile: boolean }>`
  /* margin-bottom: 20px; */
  text-align: center;

  ${({ $isMobile, theme }) =>
    $isMobile &&
    css`
      ${theme.font.subhead_04}
    `}
`;
