import styled from '@emotion/styled';

export const TableHead = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 40px 100px 120px 116px 108px 1fr 108px;

  position: relative;

  border: 2px solid ${({ theme }) => theme.colors.neutral_300_b};
  border-radius: 4px;
  margin-bottom: 4px;

  white-space: nowrap;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
`;

export const Element = styled.div`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  position: relative;
  &,
  & > * {
    ${({ theme }) => theme.font.subhead_02}
    color: ${({ theme }) => theme.colors.secondary_900}
  }
`;

export const PointerElement = styled.div`
  cursor: pointer;
  padding: 8px 16px;
  display: flex;
  gap: 4px;
  align-items: center;
  &,
  & > * {
    ${({ theme }) => theme.font.subhead_02}
    color: ${({ theme }) => theme.colors.secondary_900}
  }
`;

// searchParam에 따라  button display 해야함
