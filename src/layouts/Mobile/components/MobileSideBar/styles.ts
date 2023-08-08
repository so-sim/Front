import styled from '@emotion/styled';

export const SideBar = styled.div<{ isActive: boolean }>`
  position: absolute;
  top: 0;
  display: ${({ isActive }) => (isActive ? 'block' : 'none')}
  left: ${({ isActive }) => (isActive ? '0' : '-100%')};
  z-index: 100;
  width: 100%;
  max-width: 336px;
  background-color: ${({ theme }) => theme.colors.secondary_100};
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }
  transition: transform 0.15s ease-in-out;
`;

export const BackGround = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondary_900};
  opacity: 0.3;
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }
`;

export const SideBarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 11px 16px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral_300_b};
`;

export const GNBLink = styled.a`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral_300_b};
  ${({ theme }) => theme.font.subhead_02};
`;
