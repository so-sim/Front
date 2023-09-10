import styled from '@emotion/styled';
import { GroupColor as Color } from '@/types/group';
import { isMobile } from 'react-device-detect';

export const GroupColor = styled.div<{ color: Color; size: 'sm' | 'md' }>`
  width: 100%;
  height: ${({ size }) => (size === 'sm' ? '96px' : '120px')};
  background-color: ${({ color }) => color};
`;

export const GroupInfo = styled.div`
  margin: 14px 12px;
`;

export const GroupTitle = styled.div`
  width: calc(100% - 36px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 8px;
  ${({ theme }) => (isMobile ? theme.font.subhead_01 : theme.font.subhead_02)}
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
  width: calc(100% - 24px);
  display: block;
  height: 20px;
  padding: 2px 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 4px;
  font-size: 12px;
`;
