import styled from '@emotion/styled';

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
  gap: 12px;
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

export const Notification = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
`;

export const NotificationTitle = styled.span`
  color: ${({ theme }) => theme.colors.secondary_600};
  ${({ theme }) => theme.font.subhead_01};
`;

export const NotificationContent = styled.span`
  color: ${({ theme }) => theme.colors.secondary_800};
  ${({ theme }) => theme.font.caption};
`;

export const AddIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  bottom: 2rem;
  right: 1rem;

  width: 3.25rem;
  height: 3.25rem;

  border: 2px solid ${({ theme }) => theme.colors.primary_400};
  border-radius: 999px;

  background-color: ${({ theme }) => theme.colors.primary_500};
  color: white;
`;
