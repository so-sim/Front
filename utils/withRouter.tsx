import { Global, ThemeProvider } from '@emotion/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import globalStyle from '../styles/GlobalStyle';
import theme from '../styles/Theme';

export const withRouter = (components: any) => {
  return (
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        {components}
      </ThemeProvider>
    </MemoryRouter>
  );
};
