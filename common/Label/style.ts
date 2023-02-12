import styled from '@emotion/styled';
import { CSSProperties } from 'react';

export const Label = styled.label<{ flexDirection: CSSProperties['flexDirection'] }>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  margin-bottom: 12px;
`;

export const LabelText = styled.div`
  margin: 8px 12px 0 0;
  width: 68px;
  display: flex;
  justify-content: flex-end;
`;

export const ArrangeRow = styled.div`
  width: calc(100% - 80px);
`;
