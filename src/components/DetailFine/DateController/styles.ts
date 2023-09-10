import styled from '@emotion/styled';
import { FilterModeTest } from './hook/useDateFilter';

export const DateController = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const ArrowWrapper = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral_200_b};
  }
  &:first-of-type {
    border-right: none;
  }
`;

export const TodayButton = styled.button`
  height: 32px;
  width: 56px;
  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
  color: ${({ theme }) => theme.colors.secondary_900};
  border-radius: 4px;
  ${({ theme }) => theme.font.subhead_02};
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral_200_b};
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
  border-radius: 4px;
  position: relative;
  white-space: nowrap;
`;

export const Block = styled.span`
  display: flex;
  gap: 12px;
  align-items: flex-end;
`;

export const ControllerFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ArrowBlock = styled.span`
  display: flex;
`;

export const Date = styled.span<{ mode: FilterModeTest }>`
  width: ${({ mode }) => (mode === 'week' || mode === 'custom' ? '272px' : mode === 'day' ? '118px' : '60px')};
  white-space: nowrap;
  ${({ theme }) => theme.font.headline}
`;
