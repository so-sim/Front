import theme from './Theme';

declare module '@emotion/react' {
  export interface Theme {
    colors: typeof theme.colors;
  }
}
