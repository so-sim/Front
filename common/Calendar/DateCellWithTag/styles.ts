import styled from '@emotion/styled';

export const DateCell = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
  gap: 4px;
`;

interface DateProps {
  isToday: boolean;
  isSelectedDate: boolean;
  isCurrentMonth: boolean;
}
export const Date = styled.div<DateProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 30px;
  background-color: ${(props) => (props.isToday ? props.theme.colors.secondary_800 : props.theme.colors.white)};
  color: ${(props) => {
    if (props.isToday) {
      return props.theme.colors.white;
    } else if (!props.isCurrentMonth) {
      return props.theme.colors.secondary_400;
    } else {
      return props.theme.colors.secondary_900;
    }
  }};
  border: ${(props) => props.isToday && `2px solid ${props.theme.colors.secondary_800}`};
  :hover {
    background-color: ${(props) => (props.isToday ? props.theme.colors.secondary_600 : props.theme.colors.neutral_200_b)};
  }
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
