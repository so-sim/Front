import styled from '@emotion/styled';
import { CalnedrProps } from '.';

export const Layout = styled.div<{ $calendarType: string }>`
  padding: 48px 32px;
  width: 100%;

  min-width: ${({ $calendarType }) => ($calendarType === 'Tag' ? '1200px' : ' 360px')};

  height: calc(100vh - 68px);
  overflow-y: auto;
`;

export const Title = styled.span`
  ${({ theme }) => theme.font.body_02}
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
  white-space: nowrap;
  ${({ theme }) => theme.font.headline}
`;

export const ArrowBlock = styled.div`
  margin-top: 12px;
`;

export const ArrowWrapper = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  &:first-of-type {
    border-right: none;
  }
  &:hover {
    background: ${({ theme }) => theme.colors.neutral_200_b};
  }
`;

export const WeekDate = styled.div`
  display: flex;
  width: 100%;
  height: 32px;
  align-items: center;
  border-radius: 4px;
  justify-content: space-between;
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  margin-bottom: 12px;
  min-width: 200px;
  div {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    ${({ theme }) => theme.font.subhead_02}
  }
`;

interface CalendarContainerProps {
  length: number;
  mini: boolean;
}

export const CalendarContainer = styled.div<CalendarContainerProps>`
  display: grid;
  border: ${(props) => props.mini || `1px solid ${props.theme.colors.neutral_400_b}`};
  border-bottom: ${(props) => props.mini && `2px solid ${props.theme.colors.neutral_400_b}`};

  max-height: fit-content;
  grid-template-rows: ${(props) => `repeat(${props.length},1fr`};
`;

interface WeekWrapProps {
  cellType: 'Mark' | 'Tag';
}

export const WeekWrap = styled.div<WeekWrapProps>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  max-height: ${(props) => props.cellType === 'Mark' && '80px'};
  div {
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const NotificationDescription = styled.div`
  margin-left: 12px;
  cursor: pointer;
  display: flex;
  gap: 8px;
  padding: 9px 16px;
  background: ${({ theme }) => theme.colors.neutral_200_b};
  color: ${({ theme }) => theme.colors.secondary_800};
  ${({ theme }) => theme.font.subhead_01};
  span {
    color: ${({ theme }) => theme.colors.secondary_600};
  }
`;

export const RightItem = styled.div`
  display: flex;
  gap: 8px;
`;
