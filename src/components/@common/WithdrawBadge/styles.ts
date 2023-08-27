import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

export const WithdrawButton = styled.div<{ size: 'sm' | 'md' }>`
  display: flex;
  align-items: center;
  height: fit-content;
  padding: 2px 4px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  color: ${({ theme }) => theme.colors.secondary_700};
  ${({ theme, size }) => (isMobile || size === 'sm' ? theme.font.caption : theme.font.subhead_01)};
`;
