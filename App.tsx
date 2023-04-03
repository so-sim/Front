import { ThemeProvider, Global } from '@emotion/react';
import globalStyle from './styles/GlobalStyle';
import theme from './styles/Theme';
import Router from './routes/Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { Toast } from './common/Toast';

const queryClient = new QueryClient();

const App = () => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Router />
          <Toast />
          <Global styles={globalStyle} />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
