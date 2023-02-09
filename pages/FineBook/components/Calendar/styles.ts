import styled from '@emotion/styled';

export const Layout = styled.div`
  padding: 48px 32px;
`;

export const Header = styled.div`
  display: flex;
  margin-top: 4px;
  justify-content: space-between;
  height: 40px;
  margin-bottom: 12px;
  div {
    display: flex;
    align-items: center;
  }
`;

export const DateHeader = styled.div`
  margin-right: 12px;
  font-size: 28px;
`;

export const ArrowWrapper = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
`;

export const WeekDate = styled.div`
  display: flex;
  width: 100%;
  height: 32px;
  align-items: center;
  border-radius: 4px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  margin-bottom: 12px;
  div {
    width: 100%;
    text-align: center;
  }
`;

interface CalendarContainerProps {
  length: number;
}

export const CalendarContainer = styled.div<CalendarContainerProps>`
  display: grid;
  height: 50%;
  grid-template-rows: ${(props) => `repeat(${props.length},1fr`};
  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
`;
export const WeekWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
`;

interface DateCellProps {
  isCurrentMonth: boolean;
}

export const DateCell = styled.div<DateCellProps>`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding: 12px 4px;
  gap: 8px;
  color: ${(props) => (props.isCurrentMonth ? 'black' : props.theme.colors.secondary_400)};
  p {
    text-align: center;
    width: 28px;
    height: 28px;
  }
`;

interface TodayMark {
  isToday: boolean;
}

export const TodayMark = styled.div<TodayMark>`
  display: ${(props) => (props.isToday ? 'block' : 'none')};
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.neutral_300_b};
  z-index: -10;
  top: 7px;
`;

export const Mark = styled.div``;
