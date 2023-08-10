import styled from '@emotion/styled';

export const TableHead = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 30px 100px 120px 116px 108px 1fr;

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

export const PointerElement = styled(Element)`
  cursor: pointer;
`;

export const Arrow = styled.span`
  height: 16px;
  margin-left: 8px;
`;

// searchParam에 따라  button display 해야함
