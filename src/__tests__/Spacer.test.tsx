import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import React from 'react';

import Spacer from '@components/Spacer';

import { theme } from '../config/tests/themeMock';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Spacer Component', () => {
  it('renders with default props (vertical, size 1)', () => {
    renderWithTheme(<Spacer data-testid="spacer" />);
    const spacer = screen.getByTestId('spacer');
    expect(spacer).toBeInTheDocument();
    expect(spacer).toHaveStyle({ width: '1px', height: '8px' });
  });

  it('renders with custom size', () => {
    renderWithTheme(
      <Spacer
        size={3}
        data-testid="spacer"
      />,
    );
    const spacer = screen.getByTestId('spacer');
    expect(spacer).toHaveStyle({ width: '1px', height: '24px' });
  });

  it('renders with custom height override', () => {
    renderWithTheme(
      <Spacer
        height={50}
        data-testid="spacer"
      />,
    );
    const spacer = screen.getByTestId('spacer');
    expect(spacer).toHaveStyle({ width: '1px', height: '50px' });
  });

  it('renders with string height', () => {
    renderWithTheme(
      <Spacer
        height="2rem"
        data-testid="spacer"
      />,
    );
    const spacer = screen.getByTestId('spacer');
    expect(spacer).toHaveStyle({ width: '1px', height: '2rem' });
  });

  it('renders horizontally', () => {
    renderWithTheme(
      <Spacer
        axis="horizontal"
        size={2}
        data-testid="spacer"
      />,
    );
    const spacer = screen.getByTestId('spacer');
    expect(spacer).toHaveStyle({ width: '16px', height: '1px' });
  });

  it('renders with flex property', () => {
    renderWithTheme(
      <Spacer
        $flex
        data-testid="spacer"
      />,
    );
    const spacer = screen.getByTestId('spacer');
    expect(spacer).toHaveStyle({ flex: '1' });
  });

  it('combines all props correctly', () => {
    renderWithTheme(
      <Spacer
        axis="horizontal"
        size={4}
        $flex
        data-testid="spacer"
      />,
    );
    const spacer = screen.getByTestId('spacer');
    expect(spacer).toHaveStyle({
      width: '32px',
      height: '1px',
      flex: '1',
    });
  });

  it('height prop overrides size for vertical spacer', () => {
    renderWithTheme(
      <Spacer
        axis="vertical"
        size={2}
        height={100}
        data-testid="spacer"
      />,
    );
    const spacer = screen.getByTestId('spacer');
    expect(spacer).toHaveStyle({
      width: '1px',
      height: '100px',
    });
  });
});
