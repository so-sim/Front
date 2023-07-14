import styled from '@emotion/styled';
import { FilterModeTest } from '../hook/useDateFilter';

export const FilterButton = styled.button<{ isActive: boolean }>`
  width: 56px;
  height: 32px;
  ${({ theme }) => theme.font.subhead_01}
  border-right: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
  background-color: ${({ theme, isActive }) => (isActive ? theme.colors.neutral_300_b : '')};
  color: ${({ theme }) => theme.colors.secondary_900};
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral_200_b};
  }
  &:first-of-type {
    border-radius: 10px 0 0 10px;
  }
  &:last-of-type {
    border: none;
    border-radius: 0 10px 10px 0;
  }
`;

export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ArrowIcon = styled.span`
  height: 16px;
`;

export const DropDownWrapper = styled.div`
  position: relative;
  left: 1px;
`;
