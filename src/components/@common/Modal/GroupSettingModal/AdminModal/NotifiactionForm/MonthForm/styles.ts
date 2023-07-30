import styled from '@emotion/styled';

export const SelectDayButton = styled.button<{ isSelected?: boolean }>`
  padding: 8px 10px;
  margin-bottom: 7px;
  border-radius: 30px;
  border: 1px solid ${({ theme }) => theme.colors.neutral_300_b};
  background-color: ${({ theme, isSelected }) => isSelected && theme.colors.secondary_800};
  color: ${({ theme, isSelected }) => (isSelected ? theme.colors.secondary_100 : theme.colors.secondary_900)};
  ${({ theme }) => theme.font.caption};

  &:hover {
    background-color: ${({ theme, isSelected }) => !isSelected && theme.colors.neutral_200_b};
  }
`;
export const MonthlySelectTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px;
  margin-bottom: 4px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral_200_b};
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.subhead_02}
`;
export const Notice = styled.div`
  padding: 8px 0;
  margin: 0 0 0 8px;
  text-align: start;
  color: ${({ theme }) => theme.colors.secondary_600};
  ${({ theme }) => theme.font.body_01}
`;
export const WeekBlock = styled.div`
  display: flex;
  gap: 12px;
`;

export const DateButton = styled.button<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  padding: 4px;
  background-color: ${({ theme, isSelected }) => isSelected && theme.colors.neutral_400_b};
  border-radius: 16px;
  ${({ theme }) => theme.font.subhead_02};
  &:hover {
    background-color: ${({ theme, isSelected }) => !isSelected && theme.colors.neutral_200_b};
  }
`;

export const CalendarBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
`;

export const BodyTitle = styled.div`
  text-align: start;
  margin-left: 8px;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.body_01}
`;

export const OrdinalNumberConatiner = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;
