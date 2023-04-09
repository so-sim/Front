import styled from '@emotion/styled';

export const DateCell = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 80px;
  padding: 12px 0px;
  gap: 8px;
`;

interface SelectedWeekProps {
  isSelectedWeek: boolean;
  isFirst: boolean;
  isLast: boolean;
}

export const selectedWeek = styled.div<SelectedWeekProps>`
  position: absolute;
  width: 100%;
  height: 28px;
  background-color: ${({ theme }) => theme.colors.secondary_800};

  margin-left: ${(props) => props.isFirst && '12px'};
  margin-right: ${(props) => props.isLast && '12px'};

  border-top-left-radius: ${(props) => props.isFirst && '50px'};
  border-bottom-left-radius: ${(props) => props.isFirst && '50px'};
  border-top-right-radius: ${(props) => props.isLast && '50px'};
  border-bottom-right-radius: ${(props) => props.isLast && '50px'};

  z-index: -10;
`;

interface DateProps {
  isToday: boolean;
  isSelectedDate: boolean;
  isCurrentMonth: boolean;
  isSelectedWeek: boolean;
}

export const Date = styled.div<DateProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 30px;
  background-color: ${(props) => props.isSelectedDate && props.theme.colors.secondary_800};
  color: ${(props) => {
    if (props.isSelectedDate || props.isSelectedWeek) return props.theme.colors.white;
    if (!props.isCurrentMonth) return props.theme.colors.secondary_400;
    return props.theme.colors.secondary_900;
  }};

  border: ${(props) => props.isToday && `2px solid ${props.theme.colors.secondary_800}`};

  :hover {
    background-color: ${(props) => {
      if (props.isSelectedWeek || props.isSelectedDate) {
        return props.theme.colors.secondary_600;
      }
      return props.theme.colors.neutral_200_b;
    }};
  }
  ${({ theme }) => theme.font.subhead_02}
`;

export const Mark = styled.div``;
