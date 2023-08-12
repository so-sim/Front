import styled from '@emotion/styled';

export const Row = styled.div`
  display: flex;
  gap: 8px;
`;

export const SubRow = styled.div`
  margin-top: 8px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const WeekButton = styled.button<{ isSelected: boolean }>`
  width: 100%;
  height: 32px;
  padding: 8px 0;
  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.caption}
`;

export const FilterButton = styled.button<{ isSelected: boolean }>`
  width: 100%;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
  color: ${({ theme }) => theme.colors.secondary_900};
  border-radius: 4px;
  background-color: ${({ theme, isSelected }) => (isSelected ? theme.colors.neutral_300_b : theme.colors.secondary_100)};
  ${({ theme }) => theme.font.subhead_01}
`;

export const Title = styled.button`
  margin-bottom: 6px;
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.subhead_02}
`;

export const CustomTitle = styled.div`
  ${({ theme }) => theme.font.body_01}
`;

export const DateBox = styled.div`
  height: 24px;
  padding: 4px 12px;
  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
  ${({ theme }) => theme.font.caption};
`;

export const CustomDateBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
