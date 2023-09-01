import styled from '@emotion/styled';

export const DetailList = styled.div``;

export const TableRow = styled.div<{ isSelected: boolean; isAdmin: boolean }>`
  display: grid;
  align-items: center;
  height: 46px;
  grid-template-columns: 40px 100px 120px 116px 108px 1fr ${({ isAdmin }) => isAdmin && '108px'};
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
  border-radius: 4px;
  border-left: 2px solid white;
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

export const Element = styled.span<{ hasEllipsis?: boolean }>`
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ${({ hasEllipsis }) => hasEllipsis && 'ellipsis'};
`;

export const FlexElement = styled(Element)`
  gap: 4px;
  display: flex;
  align-items: center;
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

export const NotificationButton = styled.button<{ isActive: boolean }>`
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.colors.neutral_300_b};
  /* background-color: ${({ theme, isActive }) => (isActive ? theme.colors.secondary_100 : theme.colors.neutral_200_b)}; */
  display: flex;
  gap: 2px;
  ${({ theme }) => theme.font.body_01};
  color: ${({ theme, isActive }) => (isActive ? theme.colors.secondary_900 : theme.colors.secondary_600)};
  border-radius: 99px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral_200_b};
  }
`;
