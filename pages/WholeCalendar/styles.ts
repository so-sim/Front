import styled from '@emotion/styled';

export const Layout = styled.div`
  padding: 48px 32px;
  width: 100%;
  height: 100%;
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
  height: 90%;
  grid-template-rows: ${(props) => `repeat(${props.length},1fr`};
  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
`;

export const WeekWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const DateCell = styled.div`
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
  gap: 4px;
`;

interface TagProps {
  color: 'blue' | 'orange' | 'red';
}

export const Tag = styled.div<TagProps>`
  display: inline-flex;
  width: fit-content;
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
`;
