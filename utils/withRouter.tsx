import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import globalStyle from '../styles/GlobalStyle';
import theme from '../styles/Theme';

export const withRouter = (components: any) => {
  const queryClient = new QueryClient();

  return (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Global styles={globalStyle} />
          {components}
        </ThemeProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};
