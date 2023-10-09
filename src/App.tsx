import { ThemeProvider, Global } from '@emotion/react';
import globalStyle from './styles/GlobalStyle';
import theme from './styles/Theme';
import Router from './routes/Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import Toast, { ToastPopUp } from './components/@common/Toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';
import { TOAST_ERROR } from './constants/Toast';
import { GlobalConfirmModal } from './components/@common/Modal/ConfirmModal';
import MobileRouter from './routes/MobileRouter';
import { BrowserRouter } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Auth from './Auth';
import ErrorBoundary from './hooks/Shared/Errorboundary';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        retry: 0,
        onError: (error) => {
          const { response } = error as unknown as AxiosError;
          if (response?.status !== 401) {
            ToastPopUp({ type: 'error', message: TOAST_ERROR.NETWORK });
          }
        },
      },
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 30000,
        retry: 0,
        useErrorBoundary: true,
        onError: (error) => {
          const { response } = error as unknown as AxiosError;
          if (response?.status !== 401 && response?.status !== 400) {
            ToastPopUp({ type: 'error', message: TOAST_ERROR.DATA });
          }
        },
      },
    },
  });

  const findParentId = (target: HTMLElement, flag = true) => {
    try {
      if (target?.id === 'app') {
        //아이디가 아무 것도 없음
        return;
      }

      if (target?.id !== '' && flag) {
        //아이디가 존재한다
        return;
      }

      if (target?.id !== '') {
        //아이디가 존재한다
        dataLayer.push({ event: 'gtm.click', 'gtm.elementId': target?.id as string });
        return;
      }

      findParentId(target.parentElement!, false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <RecoilRoot>
      <div
        onClick={(e) => {
          findParentId(e.target as HTMLElement);
        }}
      >
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <ErrorBoundary>
                <Auth>
                  <MobileRouter />
                  <Router />
                </Auth>
              </ErrorBoundary>
            </BrowserRouter>
            <Toast />
            <GlobalConfirmModal />
            <Global styles={globalStyle} />
          </ThemeProvider>
          {/* <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'} /> */}
        </QueryClientProvider>
      </div>
    </RecoilRoot>
  );
};

export default App;
