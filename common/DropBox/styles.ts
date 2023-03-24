import { DropBoxColor } from './index';
import styled from '@emotion/styled';

export const DropDownBox = styled.div<{ boxWidth: string; color: DropBoxColor }>`
  position: relative;
  vertical-align: center;
  display: flex;
  align-items: center;
  width: ${({ boxWidth }) => boxWidth};
  height: 32px;
  padding: 4px 12px;
  margin-right: 0;
  background: ${({ theme, color }) => (color === 'white' ? 'transparent' : color === 'gray' ? theme.colors.secondary_200 : theme.colors.neutral_200_b)};
  border: 2px solid ${({ theme, color }) => (color === 'white' ? theme.colors.secondary_800 : color === 'disabled' ? theme.colors.neutral_400_b : theme.colors.secondary_200)};
  border-radius: 4px;
  cursor: pointer;
`;

export const Text = styled.div<{ boxWidth: string; isDisabled: boolean }>`
  ${({ theme }) => theme.font.body_02}
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${({ boxWidth, isDisabled }) => (isDisabled ? `${boxWidth}` : `calc(${boxWidth} - 52px)}`)};
  /* margin-right: 4px; */
  ${({ theme }) => theme.font.body_02}
  height: 20px;
`;

export const ArrowIcon = styled.span`
  margin-top: 4px;
`;
