import styled from '@emotion/styled';
import { CSSProperties } from 'react';

export const Label = styled.label<{ flexDirection: CSSProperties['flexDirection']; margin: string }>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  justify-content: flex-start;
  margin-bottom: ${(props) => props.margin};
`;

export const LabelText = styled.div<{ flexDirection: CSSProperties['flexDirection']; width: string; $isMobile?: boolean }>`
  ${({ $isMobile, theme }) => ($isMobile ? theme.font.subhead_01 : theme.font.subhead_03)}
  margin: 8px 8px ${({ flexDirection }) => (flexDirection === 'row' ? '0 0' : '4px 4px')};
  width: ${({ width }) => width};
  display: flex;
  white-space: nowrap;
  justify-content: ${({ flexDirection }) => (flexDirection === 'row' ? 'flex-end' : 'flex-start')};
`;

export const ArrangeRow = styled.div`
  /* width: calc(100% - 30px); */
  width: 100%;
`;
