import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

export const Label = styled.label`
  ${({ theme }) => (isMobile ? theme.font.subhead_02 : theme.font.subhead_03)}
  height: 40px;
  input {
    margin-right: 8px;
  }
`;

export const Footer = styled.div`
  margin-top: 32px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 12px;
`;
