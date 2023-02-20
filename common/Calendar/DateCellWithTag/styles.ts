import styled from '@emotion/styled';

interface DateCellProps {
  isCurrentMonth: boolean;
}

export const DateCell = styled.div<DateCellProps>`
  cursor: pointer;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
  gap: 4px;
  color: ${(props) => (props.isCurrentMonth ? 'black' : props.theme.colors.secondary_400)};
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
  top: 3px;
  left: 0;
`;

interface TagProps {
  color: 'blue' | 'orange' | 'red';
}

export const Tag = styled.div<TagProps>`
  display: inline-flex;
  width: fit-content;
  white-space: nowrap;
  font-size: 16px;
  gap: 4px;
  text-align: center;
  align-items: center;

  padding: 0 12px;
  height: 32px;
  border: 2px solid;
  border-radius: 20px;
  border-color: ${({ theme, color }) => {
    const colors = {
      blue: theme.colors.primary_600,
      red: theme.colors.red_600,
      orange: theme.colors.orange_600,
    };
    return colors[color];
  }};
  color: ${({ theme, color }) => {
    const colors = {
      blue: theme.colors.primary_600,
      red: theme.colors.red_600,
      orange: theme.colors.orange_600,
    };
    return colors[color];
  }};
  background-color: ${({ theme, color }) => {
    const colors = {
      blue: theme.colors.neutral_200_b,
      red: theme.colors.red_200,
      orange: theme.colors.orange_200,
    };
    return colors[color];
  }};

  @media (max-width: 1718px) {
    font-size: 12px;
    padding: 8px;
    gap: 2px;
  }
`;
