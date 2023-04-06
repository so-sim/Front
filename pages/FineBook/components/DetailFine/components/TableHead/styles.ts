import styled from '@emotion/styled';

export const TableHead = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 100px 120px 116px 108px 1fr;
  border: 2px solid ${({ theme }) => theme.colors.neutral_300_b};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  margin-bottom: 4px;
  white-space: nowrap;
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
