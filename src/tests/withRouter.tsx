import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import globalStyle from '../styles/GlobalStyle';
import theme from '../styles/Theme';

export const withRouter = (components: JSX.Element | JSX.Element[], initailEntry = '/') => {
  const queryClient = createQueryClient();

  return (
    <RecoilRoot>
      <MemoryRouter initialEntries={[initailEntry]}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <Global styles={globalStyle} />
            {components}
          </ThemeProvider>
        </QueryClientProvider>
      </MemoryRouter>
    </RecoilRoot>
  );
};

const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });
};
