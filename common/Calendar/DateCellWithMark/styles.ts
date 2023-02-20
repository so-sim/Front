import styled from '@emotion/styled';

interface DateCellProps {
  isCurrentMonth: boolean;
}

export const DateCell = styled.div<DateCellProps>`
  cursor: pointer;
  position: relative;
  display: flex;
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
