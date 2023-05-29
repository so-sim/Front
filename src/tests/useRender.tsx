import { ThemeProvider } from '@emotion/react';
import theme from '../styles/Theme';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const ThemeHOC = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const useRender = (children: JSX.Element | JSX.Element[], initailEntry = '/') => {
  const queryClient = new QueryClient();
  return render(
    <ThemeHOC>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[initailEntry]}>
          <Routes>{children}</Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeHOC>,
  );
};

export default useRender;
