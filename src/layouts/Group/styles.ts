import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Header = styled.header`
  width: 100%;
  height: 68px;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  div {
    cursor: pointer;
  }
  button {
    position: relative;
  }
  span {
    cursor: pointer;
  }
`;

export const GridLayout = styled.div<{ isSideBarOpen: boolean }>`
  display: grid;
  height: calc(100vh - 68px);
  /* transition: all 3s ease-in-out; */
  grid-template-columns: ${({ isSideBarOpen }) => (isSideBarOpen ? '384px auto' : 'auto')};
  @media (max-width: 1679px) {
    grid-template-columns: ${({ isSideBarOpen }) => (isSideBarOpen ? '360px auto' : 'auto')};
  }
`;

// Todo: 이거 왜 애니메이션이 안 될까요.....??
export const SideBar = styled.div<{ isSideBarOpen: boolean }>`
  ${({ isSideBarOpen }) =>
    isSideBarOpen
      ? css`
          display: grid;
          grid-template-columns: 100px auto;
        `
      : css`
          display: none;
        `};
  height: 100%;
  /* transition: 3s ease-in-out; */
`;
