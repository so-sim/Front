import styled from '@emotion/styled';

export const Layout = styled.div`
  display: grid;
  grid-template-rows: 47px 1fr;
  min-height: 100vh;
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }
`;

export const Body = styled.div<{ isHome: boolean }>`
  background: ${({ theme, isHome }) => isHome && theme.colors.neutral_200_b};
`;
