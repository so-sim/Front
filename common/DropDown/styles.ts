import { DropDownProps } from './index';
import styled from '@emotion/styled';

export const DorpDownContainer = styled.div<Pick<DropDownProps, 'top' | 'direction'>>`
  position: absolute;
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  border-bottom: none;
  border-radius: 4px;
  top: ${(props) => props.top};
  z-index: 5;
  ${(props) => (props.direction === 'right' ? 'left: -2px' : 'right: -2px')};
`;

interface DropDownItemProps {
  width: number;
  hasSvg: boolean;
  align: 'start' | 'center';
}

export const DropDownItem = styled.div<DropDownItemProps>`
  box-sizing: border-box;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: ${({ align }) => (align === 'center' ? 'center' : 'flex-start')};
  padding: ${(props) => (props.hasSvg ? '4px 8px' : '4px 12px')};
  max-height: 192px;
  overflow: auto;
  line-height: 7px;
  gap: 4px;
  width: ${(props) => `${props.width - 4}px`};
  background-color: white;
  cursor: pointer;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  span {
    ${({ theme }) => theme.font.body_02}
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral_300_b};
  }
`;
