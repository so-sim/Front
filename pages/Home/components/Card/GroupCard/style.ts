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
  border: 1px solid ${({ theme }) => theme.colors.secondary_200};
  border-radius: 6px;
`;
