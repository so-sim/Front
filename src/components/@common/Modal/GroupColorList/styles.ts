import { GroupColor } from '@/types/group';
import styled from '@emotion/styled';

export const ColorButton = styled.button<{ color: GroupColor }>`
  background-color: ${({ color }) => color};
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

export const SelectedButton = styled.li<{ select: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid ${({ theme, select }) => (select ? theme.colors.secondary_400 : 'transparent')};
  margin: 0;
`;

export const GroupColorList = styled.ul`
  width: calc(100% - 80px);
  display: flex;
  gap: 4px;
  align-items: center;
  margin-top: 3px;
`;
