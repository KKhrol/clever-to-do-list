import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { StyledTitle } from '../components/StyledTitle';
import { theme } from '../config/tests/themeMock';

describe('StyledTitle Component', () => {
  const renderWithTheme = (ui: React.ReactNode) => {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  };

  it('renders children correctly', () => {
    renderWithTheme(<StyledTitle>Test Title</StyledTitle>);

    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('H2');
  });
  it('applies default size when no size prop is provided', () => {
    renderWithTheme(
      <StyledTitle data-testid="default-title">Default Size Title</StyledTitle>,
    );

    const titleElement = screen.getByTestId('default-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveStyle({ fontSize: '28px' });
  });
  it('applies different sizes correctly with the right font sizes', () => {
    const { rerender } = renderWithTheme(
      <StyledTitle
        size="xs"
        data-testid="xs-title"
      >
        Extra Small Title
      </StyledTitle>,
    );

    const xsTitle = screen.getByTestId('xs-title');
    expect(xsTitle).toBeInTheDocument();
    expect(xsTitle).toHaveStyle({ fontSize: '12px' });

    rerender(
      <ThemeProvider theme={theme}>
        <StyledTitle
          size="md"
          data-testid="md-title"
        >
          Medium Title
        </StyledTitle>
      </ThemeProvider>,
    );

    const mdTitle = screen.getByTestId('md-title');
    expect(mdTitle).toBeInTheDocument();
    expect(mdTitle).toHaveStyle({ fontSize: '16px' });

    rerender(
      <ThemeProvider theme={theme}>
        <StyledTitle
          size="xl"
          data-testid="xl-title"
        >
          Extra Large Title
        </StyledTitle>
      </ThemeProvider>,
    );

    const xlTitle = screen.getByTestId('xl-title');
    expect(xlTitle).toBeInTheDocument();
    expect(xlTitle).toHaveStyle({ fontSize: '28px' });
  });
  it('passes additional props to the component', () => {
    renderWithTheme(
      <StyledTitle
        data-testid="custom-title"
        className="custom-class"
        style={{ marginTop: '10px' }}
      >
        Title with Custom Props
      </StyledTitle>,
    );

    const titleElement = screen.getByTestId('custom-title');
    expect(titleElement).toHaveClass('custom-class');
    expect(titleElement).toHaveTextContent('Title with Custom Props');
    expect(titleElement).toHaveStyle({ marginTop: '10px' });
  });

  it('applies correct font weight and color', () => {
    renderWithTheme(
      <StyledTitle data-testid="styled-title">Styled Title</StyledTitle>,
    );

    const titleElement = screen.getByTestId('styled-title');
    expect(titleElement).toHaveStyle({
      fontWeight: 700,
      color: theme.palette.text.primary,
      margin: '0',
    });
  });
});
