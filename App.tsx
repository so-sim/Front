import { ThemeProvider, Global } from '@emotion/react';
import globalStyle from './styles/GlobalStyle';
import theme from './styles/Theme';
import Router from './routes/Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { Toast } from './common/Toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        retry: 2,
      },
      queries: {
        retry: 2,
      },
    },
  });

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Router />
          <Toast />
          <Global styles={globalStyle} />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={true} position={'bottom-right'} />
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
