import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

export const Title = styled.div`
  /* margin-bottom: 32px; */
  text-align: center;
  ${({ theme }) => (isMobile ? theme.font.subhead_04 : theme.font.display_01)};
`;

export const Text = styled.span`
  ${({ theme }) => (isMobile ? theme.font.body_02 : theme.font.body_03)};
`;
