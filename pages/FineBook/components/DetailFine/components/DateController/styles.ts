import styled from '@emotion/styled';
import { FilterMode } from '../..';

export const DateController = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
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
`;

export const TodayButton = styled.button`
  height: 32px;
  width: 56px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  border-radius: 4px;
  ${({ theme }) => theme.font.subhead_02}
`;

export const FilterButton = styled.button<{ isActive: boolean }>`
  width: 56px;
  height: 32px;
  ${({ theme }) => theme.font.subhead_01}
  border-right: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  background-color: ${({ theme, isActive }) => (isActive ? theme.colors.neutral_200_b : '')};
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

export const FilterWrapper = styled.button`
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  border-radius: 12px;
  /* overflow: hidden; */
  position: relative;
`;

export const Block = styled.span`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const ControllerFrame = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const ArrowBlock = styled.span`
  display: flex;
`;

export const Date = styled.span<{ mode: FilterMode }>`
  width: ${({ mode }) => (mode === 'week' ? '254px' : mode === 'day' ? '112px' : '52px')};
  white-space: nowrap;
  ${({ theme }) => theme.font.headline}
`;
