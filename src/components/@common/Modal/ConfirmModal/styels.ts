import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

export const Title = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 32px;
  ${({ theme }) => (isMobile ? theme.font.subhead_04 : theme.font.headline)}
`;

export const Desc = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: pre;
  ${({ theme }) => (isMobile ? theme.font.body_02 : theme.font.body_03)}
`;
