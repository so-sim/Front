import { DropDownProps } from './index';
import styled from '@emotion/styled';

export const DorpDownContainer = styled.div<Pick<DropDownProps, 'top'>>`
  position: absolute;
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  border-bottom: none;
  border-radius: 4px;
  right: -2px;
  top: ${(props) => props.top};
`;

interface DropDownItemProps {
  width: number;
  hasSvg: boolean;
}

export const DropDownItem = styled.div<DropDownItemProps>`
  box-sizing: border-box;
  height: 32px;
  display: flex;
  align-items: center;
  padding: ${(props) => (props.hasSvg ? '4px 8px' : '4px 12px')};
  line-height: 7px;
  gap: 4px;
  width: ${(props) => `${props.width - 4}px`};
  background-color: white;
  cursor: pointer;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral_300_b};
  }
`;
