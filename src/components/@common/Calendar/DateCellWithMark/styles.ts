import { FilterModeTest } from '@/components/DetailFine/DateController/hook/useDateFilter';
import styled from '@emotion/styled';

interface DateProps {
  isToday: boolean;
  isSelectedDate: boolean;
  isCurrentMonth: boolean;
  isSelectedPeriod: boolean;
  mode: FilterModeTest;
}

export const Date = styled.div<DateProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 30px;
  background-color: ${(props) => props.isSelectedDate && props.theme.colors.neutral_300_b};
  color: ${(props) => {
    if (!props.isCurrentMonth) return props.theme.colors.secondary_400;
    return props.theme.colors.secondary_900;
  }};

  border: ${(props) => props.isToday && `2px solid ${props.theme.colors.neutral_300_b}`};

  ${({ theme }) => theme.font.subhead_02};
`;

export const DateCell = styled.div<DateProps>`
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 85px;
  height: 85px;
  padding: 12px 0px;
  gap: 8px;
  border-top: 2px solid ${({ theme }) => theme.colors.neutral_400_b};

  &:hover ${Date} {
    background-color: ${({ theme, isSelectedPeriod, isSelectedDate }) => {
      if (isSelectedPeriod || isSelectedDate) {
        return theme.colors.neutral_400_b;
      }
      return theme.colors.neutral_200_b;
    }};
  }
`;

interface SelectedWeekProps {
  isSelectedPeriod: boolean;
  isFirst: boolean;
  isLast: boolean;
  mode: FilterModeTest;
}

export const SelectedPeriod = styled.div<SelectedWeekProps>`
  position: absolute;
  width: 100%;
  height: 28px;
  background-color: ${({ theme, mode }) => mode !== 'day' && theme.colors.neutral_300_b};

  margin-left: ${(props) => props.isFirst && '12px'};
  margin-right: ${(props) => props.isLast && '12px'};

  border-top-left-radius: ${(props) => props.isFirst && '50px'};
  border-bottom-left-radius: ${(props) => props.isFirst && '50px'};
  border-top-right-radius: ${(props) => props.isLast && '50px'};
  border-bottom-right-radius: ${(props) => props.isLast && '50px'};

  z-index: -10;
`;

export const Mark = styled.div``;
