import styled from '@emotion/styled';
import { CSSProperties } from 'react';

export const Label = styled.label<{ flexDirection: CSSProperties['flexDirection'] }>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  margin-bottom: 12px;
`;

export const LabelText = styled.div<{ flexDirection: CSSProperties['flexDirection'] }>`
  margin: 8px 12px ${({ flexDirection }) => (flexDirection === 'row' ? '0 0' : '8px 4px')};
  width: 80px;
  display: flex;
  justify-content: ${({ flexDirection }) => (flexDirection === 'row' ? 'flex-end' : 'flex-start')};
`;

export const ArrangeRow = styled.div`
  /* width: calc(100% - 30px); */
  width: 100%;
`;
