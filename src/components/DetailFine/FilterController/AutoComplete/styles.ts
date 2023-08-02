import styled from '@emotion/styled';

export const SearchBar = styled.input`
  height: 24px;
  color: ${({ theme }) => theme.colors.secondary_800};
  ${({ theme }) => theme.font.body_02};
`;

export const AutoCompleteContainer = styled.div`
  position: relative;
`;

export const DropDownContainer = styled.ul`
  position: absolute;
  left: -28px;
  top: 32px;
  padding: 12px 8px;
  height: 160px;
  width: 295px;
  z-index: 20;
  border-radius: 4px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 7px;
    height: 52px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.secondary_300};
  }
  /* overflow: hidden; */
  background-color: ${({ theme }) => theme.colors.secondary_100};
  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
`;

export const MemberListItem = styled.li<{ isSelectedIdx: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 4px;
  color: ${({ theme }) => theme.colors.secondary_900};
  cursor: pointer;
  ${({ theme }) => theme.font.subhead_01};
  background-color: ${({ theme, isSelectedIdx }) => (isSelectedIdx ? theme.colors.neutral_200_b : '')};

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral_200_b};
  }
`;

export const WithdrawButton = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 4px;
  height: 20px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  color: ${({ theme }) => theme.colors.secondary_700};
  ${({ theme }) => theme.font.caption};
`;

export const NotFoundResult = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
