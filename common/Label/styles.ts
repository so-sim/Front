import styled from '@emotion/styled';
import { CSSProperties } from 'react';

export const Label = styled.label<{ flexDirection: CSSProperties['flexDirection']; margin: string }>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  justify-content: flex-start;
  margin-bottom: ${(props) => props.margin};
`;

export const LabelText = styled.div<{ flexDirection: CSSProperties['flexDirection']; width: string }>`
  ${({ theme }) => theme.font.subhead_02}
  margin: 8px 12px ${({ flexDirection }) => (flexDirection === 'row' ? '0 0' : '8px 4px')};
  width: ${({ width }) => width};
  display: flex;
  white-space: nowrap;
  justify-content: ${({ flexDirection }) => (flexDirection === 'row' ? 'flex-end' : 'flex-start')};
`;

export const ArrangeRow = styled.div`
  /* width: calc(100% - 30px); */
  width: 100%;
`;
