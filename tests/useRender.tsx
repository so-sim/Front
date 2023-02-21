import { ThemeProvider } from '@emotion/react';
import theme from '../styles/Theme';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes } from 'react-router-dom';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const ThemeHOC = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const useRender = (children: JSX.Element | JSX.Element[], initailEntry = '/') => {
  return render(
    <ThemeHOC>
      <MemoryRouter initialEntries={[initailEntry]}>
        <Routes>{children}</Routes>
      </MemoryRouter>
    </ThemeHOC>,
  );
};

export default useRender;
