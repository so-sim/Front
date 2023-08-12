import styled from '@emotion/styled';

export const SearchMemberInput = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding-bottom: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral_200_b};

  & > * {
    padding: 0;
    color: ${({ theme }) => theme.colors.secondary_900};
    ${({ theme }) => theme.font.body_02};
  }
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

export const MemberListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 4px;

  width: 100%;
  height: 28px;
  ${({ theme }) => theme.font.subhead_02};
`;

export const MemberList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
