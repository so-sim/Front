import styled from '@emotion/styled';
import { GroupColor as Color } from '../../../../../constants';

export const GroupColor = styled.div<{ color: Color }>`
  width: 100%;
  height: 120px;
  background-color: ${({ theme, color }) => theme.cover[color]};
`;

export const GroupInfo = styled.div`
  margin: 14px 12px;
`;

export const GroupTitle = styled.div`
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 8px;
  ${({ theme }) => theme.font.subhead_02}
`;

export const GroupPeople = styled.div`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.secondary_600};
  ${({ theme }) => theme.font.caption};
`;

export const GroupIcon = styled.div`
  height: 20px;
  width: 20px;
  padding: 2px;
  display: flex;
  align-items: center;
`;

export const GroupAdminName = styled.div`
  width: 128px;
  display: block;
  height: 20px;
  padding: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 8px;
  font-size: 12px;
`;
