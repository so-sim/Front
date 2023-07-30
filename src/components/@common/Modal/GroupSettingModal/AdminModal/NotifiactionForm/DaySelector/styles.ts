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

export const DayContainer = styled.div`
  display: flex;
  gap: 8px;
`;
