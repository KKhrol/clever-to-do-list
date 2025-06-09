import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import React from 'react';

import LayoutContainer from '../components/LayoutContainer';
import { theme } from '../config/tests/themeMock';

describe('LayoutContainer Component', () => {
  const renderWithTheme = (ui: React.ReactNode) => {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  };

  it('renders children correctly', () => {
    renderWithTheme(
      <LayoutContainer>
        <div data-testid="test-child">Test Content</div>
      </LayoutContainer>,
    );

    const childElement = screen.getByTestId('test-child');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Test Content');
  });
  it('applies default styles', () => {
    renderWithTheme(
      <LayoutContainer>
        <div>Content</div>
      </LayoutContainer>,
    );

    const container = screen.getByTestId('layout-container');

    expect(container).toHaveStyle('display: flex');
    expect(container).toHaveStyle('flex-direction: column');
    expect(container).toHaveStyle('align-items: center');
    expect(container).toHaveStyle('width: 100%');
  });

  it('applies custom styles when props are provided', () => {
    renderWithTheme(
      <LayoutContainer
        data-testid="custom-layout"
        $flexDirection="row"
        $alignItems="flex-start"
        $width="50%"
        $overflow="auto"
      >
        <div>Content</div>
      </LayoutContainer>,
    );

    const container = screen.getByTestId('custom-layout');

    expect(container).toHaveStyle('flex-direction: row');
    expect(container).toHaveStyle('align-items: flex-start');
    expect(container).toHaveStyle('width: 50%');
    expect(container).toHaveStyle('overflow: auto');
  });
});
