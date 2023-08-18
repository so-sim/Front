import styled from '@emotion/styled';

export const ListItem = styled.li`
  width: 100%;
  padding: 8px 4px;
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.subhead_02};
`;

export const GroupTitle = styled.div`
  width: 100%;
  padding: 4px 8px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.body_02};
`;

export const DeleteButton = styled.button`
  width: 82px;
  padding: 5px 12px;
  border-radius: 4px;
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.secondary_900};
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  ${({ theme }) => theme.font.subhead_01};
`;

export const WithDrwal = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 32px;
`;

export const QuitButton = styled.button`
  ${({ theme }) => theme.font.subhead_01};
  white-space: nowrap;
  display: flex;
  align-items: center;
  height: 32px;
  padding: 6px 12px;
  color: ${({ theme }) => theme.colors.secondary_900};
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
`;
