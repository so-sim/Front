import styled from '@emotion/styled';

export const DateController = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const ArrowWrapper = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral_200_b};
  }
`;

export const TodayButton = styled.button`
  padding: 4px 12px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  border-radius: 4px;
`;

export const FilterButton = styled.button<{ last?: boolean }>`
  padding: 4px 12px;
  border-right: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  border: ${({ last }) => last && 'none'};
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral_200_b};
  }
`;

export const FilterWrapper = styled.button`
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  border-radius: 12px;
  overflow: hidden;
`;

export const Block = styled.span`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const ControllerFrame = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const ArrowBlock = styled.span`
  display: flex;
`;
