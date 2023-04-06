import styled from '@emotion/styled';

export const Calendar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 24px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 2px 0px 25px 7px rgba(156, 156, 156, 0.15);
`;

export const Date = styled.span`
  ${({ theme }) => theme.font.subhead_02}
`;

export const ArrowIcon = styled.span`
  height: 16px;
  width: 16px;
`;

export const ArrowBlock = styled.span`
  display: flex;
  gap: 12px;
`;

export const FlexGap = styled.div`
  display: flex;
  gap: 4px;
`;

export const Week = styled(FlexGap)``;
export const DayTitle = styled(FlexGap)``;

export const Day = styled.div<{ isSunday: boolean; isSelected?: boolean; isOtherMonth?: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.font.subhead_02}
  background-color: ${({ theme, isSelected }) => isSelected && theme.colors.neutral_400_b};
  color: ${({ theme, isSunday, isOtherMonth }) => (isOtherMonth ? theme.colors.secondary_400 : isSunday ? theme.colors.system_red_200 : theme.colors.secondary_900)};
`;

export const DateTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const DayType = styled(Day)`
  ${({ theme }) => theme.font.caption}
  color: ${({ theme, isSunday }) => (isSunday ? theme.colors.system_red_200 : theme.colors.secondary_600)}
`;
