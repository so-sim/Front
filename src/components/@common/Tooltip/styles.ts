import styled from '@emotion/styled';
import { Location } from './index';

export const Arrow = styled.div<{ top: string; left: string; location: Location }>`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
`;

export const Frame = styled.div<{ width: number; isOnlyTitle: boolean }>`
  width: ${({ width }) => `${width}px`};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: ${({ theme, isOnlyTitle }) => (isOnlyTitle ? '4px 8px' : '16px 12px')};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.secondary_800};
`;

export const Header = styled.span<{ isOnlyTitle: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.secondary_100};

  span {
    white-space: initial;
    ${({ theme, isOnlyTitle }) => (isOnlyTitle ? theme.font.subhead_02 : theme.font.subhead_03)};
  }
`;

export const Page = styled.div<{ isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme, isActive }) => (isActive ? theme.colors.neutral_200_b : theme.colors.secondary_600)};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NextButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 36px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.secondary_200};
  ${({ theme }) => theme.font.subhead_02};
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 4px;
`;
