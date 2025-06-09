import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';

import Header from '../components/Header';
import { theme } from '../config/tests/themeMock';

jest.mock('i18next', () => ({
  t: jest.fn((key: string): string => {
    if (key === 'common:header.title') return 'Clever To-Do List';
    return key;
  }),
}));

jest.mock('@components/Menu', () => () => (
  <div data-testid="menu-component">Menu</div>
));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Header Component', () => {
  it('renders header with title', () => {
    renderWithTheme(<Header />);

    expect(screen.getByTestId('header-component')).toBeInTheDocument();
    expect(screen.getByTestId('header-center-container')).toBeInTheDocument();
    expect(screen.getByTestId('header-title')).toBeInTheDocument();
    expect(screen.getByTestId('header-icon')).toBeInTheDocument();

    expect(screen.getByTestId('header-title')).toHaveTextContent(
      'Clever To-Do List',
    );

    expect(screen.queryByTestId('menu-component')).not.toBeInTheDocument();
  });
  it('renders menu when showMenu is true', () => {
    renderWithTheme(<Header showMenu={true} />);

    expect(screen.getByTestId('header-component')).toBeInTheDocument();
    expect(screen.getByTestId('header-title')).toBeInTheDocument();
    expect(screen.getByTestId('header-icon')).toBeInTheDocument();

    expect(screen.getByTestId('menu-component')).toBeInTheDocument();
  });
  it('has correct layout based on showMenu prop', () => {
    const { rerender } = renderWithTheme(<Header showMenu={false} />);

    const headerElement = screen.getByTestId('header-component');
    expect(headerElement).toHaveStyle('justify-content: center');

    rerender(
      <ThemeProvider theme={theme}>
        <Header showMenu={true} />
      </ThemeProvider>,
    );

    expect(headerElement).toHaveStyle('justify-content: space-between');
  });
});
