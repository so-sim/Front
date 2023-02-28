import styled from '@emotion/styled';

export const TableRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 100px 120px 116px 108px 1fr;
  border-top: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral_200_b};
  }
  & > span {
    padding: 8px 16px;
  }
`;

export const NotFoundList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 220px;
  width: 100%;
`;
