import styled from '@emotion/styled';

export const Layout = styled.div`
  display: grid;
  grid-template-rows: 47px 1fr;
  height: calc(var(--vh, 1vh));
  min-height: 100vh;
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }
`;

export const Body = styled.div``;
