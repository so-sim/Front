import styled from '@emotion/styled';

export const DateCell = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 4px;
  gap: 8px;
`;

interface DateProps {
  isToday: boolean;
  isSelected: boolean;
  isCurrentMonth: boolean;
}

export const Date = styled.div<DateProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 30px;
  background-color: ${(props) => (props.isToday ? props.theme.colors.secondary_800 : 'white')};
  color: ${(props) => {
    if (props.isToday) {
      return props.theme.colors.white;
    } else if (!props.isCurrentMonth) {
      return props.theme.colors.secondary_400;
    } else {
      return props.theme.colors.secondary_900;
    }
  }};
  border: ${(props) => props.isSelected && `2px solid ${props.theme.colors.secondary_800}`};
  :hover {
    background-color: ${(props) => (props.isToday ? props.theme.colors.secondary_600 : props.theme.colors.neutral_200_b)};
  }
`;

export const Mark = styled.div``;
