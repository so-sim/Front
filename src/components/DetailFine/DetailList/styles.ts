import styled from '@emotion/styled';

export const DetailList = styled.div``;

export const TableRow = styled.div<{ isSelected: boolean }>`
  display: grid;
  align-items: center;
  height: 46px;
  grid-template-columns: 40px 100px 120px 116px 108px 1fr;
  border-top: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
  border-radius: 4px;
  cursor: pointer;
  background: ${({ theme, isSelected }) => (isSelected ? theme.colors.neutral_300_b : theme.colors.secondary_100)};
  &:hover {
    background-color: ${({ theme, isSelected }) => (isSelected ? theme.colors.neutral_300_b : theme.colors.neutral_200_b)};
  }
  & > span {
    padding: 8px 16px;
    ${({ theme }) => theme.font.body_02}
  }
  &:last-child {
    border-bottom: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
  }
`;

export const NotFoundList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 220px;
  width: 100%;
  color: ${({ theme }) => theme.colors.secondary_600};
  ${({ theme }) => theme.font.headline}
`;

export const Element = styled.span<{ hasEllipsis: boolean }>`
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ${({ hasEllipsis }) => hasEllipsis && 'ellipsis'};
`;

export const GroundText = styled.span`
  ${({ theme }) => theme.font.subhead_02}
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
