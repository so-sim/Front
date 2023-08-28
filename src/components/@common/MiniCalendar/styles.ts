import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

export const Calendar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 24px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 2px 0px 25px 7px rgba(156, 156, 156, 0.15);
  max-width: ${isMobile ? '302px' : '268px'};
`;

export const Date = styled.span`
  ${({ theme }) => theme.font.subhead_02};
`;

export const ArrowIcon = styled.span`
  height: 16px;
  width: 16px;
`;

export const ArrowBlock = styled.span`
  display: flex;
  gap: 12px;
  cursor: pointer;
`;

export const FlexGap = styled.div`
  display: flex;
  gap: 4px;
`;

export const Week = styled(FlexGap)``;
export const DayTitle = styled(FlexGap)``;

export const Day = styled.div<{ isSunday: boolean; isSelected?: boolean; isOtherMonth?: boolean; isInvalid?: boolean }>`
  width: ${isMobile ? '34px' : '28px'};
  height: ${isMobile ? '34px' : '28px'};
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.font.subhead_02}
  background-color: ${({ theme, isSelected, isInvalid }) => isSelected && !isInvalid && theme.colors.neutral_400_b};
  color: ${({ theme, isSunday, isOtherMonth, isInvalid }) =>
    isInvalid ? theme.colors.neutral_300_b : isOtherMonth ? theme.colors.secondary_400 : isSunday ? theme.colors.system_red_200 : theme.colors.secondary_900};
  &:hover {
    background-color: ${({ theme, isInvalid }) => !isInvalid && theme.colors.neutral_400_b};
  }
  cursor: ${({ theme, isInvalid }) => !isInvalid && 'pointer'};
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

export const Trigger = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  margin-top: 8px;
`;
