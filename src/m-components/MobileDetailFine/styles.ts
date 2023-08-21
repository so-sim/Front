import styled from '@emotion/styled';

export const MobileDetailFineFrame = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  height: calc(var(--vh, 80px) * 100);

  position: fixed;
  top: ${({ $isOpen }) => ($isOpen ? '80px' : '100%')};
  left: 0;

  text-align: left;
  background: #fff;
  transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1);
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;

  color: ${({ theme }) => theme.colors.secondary_800};
  ${({ theme }) => theme.font.body_01};
`;

export const SearchMemberInput = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  & > * {
    color: ${({ theme }) => theme.colors.secondary_600};
    ${({ theme }) => theme.font.body_02};
  }
`;

export const FilterRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral_200_b};
`;

export const SelectedMember = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.caption};
`;

export const SelectedNickname = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const CancelButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const MobileDetailFineHeader = styled.div`
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral_300_b};
`;

export const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8px 0 12px 0;
`;
