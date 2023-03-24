import styled from '@emotion/styled';

export const Pagination = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const Page = styled.span<{ isSelected: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, isSelected }) => (isSelected ? theme.colors.neutral_400_b : 'transparent')};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral_400_b};
  }
`;

export const DoubleArrow = styled.span`
  margin: 2px 12px 0 12px;
  height: 24px;
  cursor: pointer;
`;
