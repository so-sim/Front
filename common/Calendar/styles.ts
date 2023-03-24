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
  white-space: nowrap;
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
  mini: boolean;
}

export const CalendarContainer = styled.div<CalendarContainerProps>`
  display: grid;
  max-height: ${(props) => (props.mini ? '50%' : '100%')};
  grid-template-rows: ${(props) => `repeat(${props.length},1fr`};
  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
`;

interface WeekWrapProps {
  cellType: 'Mark' | 'Tag';
}

export const WeekWrap = styled.div<WeekWrapProps>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  max-height: ${(props) => props.cellType === 'Mark' && '80px'};
  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
`;
