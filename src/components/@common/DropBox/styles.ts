import { DropBoxColor } from './index';
import styled from '@emotion/styled';

export const DropDownBox = styled.div<{ boxWidth: string; color: DropBoxColor; focus: boolean }>`
  position: relative;
  vertical-align: center;
  display: flex;
  align-items: center;
  width: ${({ boxWidth }) => boxWidth};
  height: 36px;
  padding: 4px 12px;
  margin-right: 0;
  background: ${({ theme, color }) => (color === 'white' ? 'transparent' : theme.colors.neutral_200_b)};
  border: ${({ theme, color, focus }) =>
    focus ? `1px solid ${theme.colors.secondary_600}` : color === 'white' ? `1px solid ${theme.colors.secondary_400}` : `2px solid ${theme.colors.neutral_400_b}`};
  border-radius: 4px;
  cursor: pointer;
  justify-content: space-between;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
`;

type TextProps = { boxWidth: string; isDisabled: boolean; isSelected: boolean; focus: boolean };
export const Text = styled.div<TextProps>`
  color: ${({ theme, isSelected, focus }) => (focus ? theme.colors.secondary_900 : isSelected ? theme.colors.secondary_900 : theme.colors.secondary_600)};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: start;
  height: 20px;
  width: ${({ boxWidth, isDisabled }) => (isDisabled ? `${boxWidth}` : `calc(${boxWidth} - 52px)}`)};
  /* margin-right: 4px; */
  ${({ theme }) => theme.font.body_02};
`;

export const ArrowIcon = styled.div<{ focus: boolean }>`
  display: flex;
  align-items: center;
  height: 16px;
  transform: ${({ focus }) => (focus ? `rotate(180deg)` : '')};
  transition: 0.15s ease-in-out;
`;
