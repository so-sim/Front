import styled from '@emotion/styled';

export const GroupColor = styled.div<{ color: string }>`
  width: 100%;
  height: 120px;
  background-color: ${({ color }) => color};
`;

export const GroupInfo = styled.div`
  margin: 16px 12px 0 12px;
`;

export const GroupTitle = styled.div`
  margin-bottom: 8px;
`;

export const GroupPeople = styled.div`
  display: flex;
  align-items: center;
`;

export const GroupIcon = styled.div`
  height: 20px;
  width: 20px;
  padding: 4px;
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.secondary_200};
  border-radius: 6px 0 0 6px;
`;

export const GroupPeopleNumber = styled.div`
  height: 20px;
  padding: 4px;
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.secondary_200};
  border-left: none;
  border-radius: 0 6px 6px 0;
  padding-left: 8px;
  font-size: 12px;
`;
