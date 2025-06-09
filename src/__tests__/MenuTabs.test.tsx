/* eslint-disable @typescript-eslint/no-unsafe-return */
import { fireEvent, render, screen } from '@testing-library/react';
import {
  MemoryRouter,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { MainTabValues } from 'src/constants/mainTabValues';

import MenuTabs from '../components/Menu/MenuTabs';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
  useLocation: jest.fn(),
}));

describe('MenuTabs Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useParams as jest.Mock).mockReturnValue({ tab: MainTabValues.HOME });
    (useLocation as jest.Mock).mockReturnValue({
      pathname: `/${MainTabValues.HOME}`,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders tabs with correct labels', () => {
    render(
      <MemoryRouter>
        <MenuTabs />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('menu-tabs')).toBeInTheDocument();
    expect(screen.getByTestId('tab-home')).toBeInTheDocument();
    expect(screen.getByTestId('tab-calendar')).toBeInTheDocument();

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Calendar')).toBeInTheDocument();
  });
  it('selects current tab based on URL parameter', () => {
    render(
      <MemoryRouter>
        <MenuTabs />
      </MemoryRouter>,
    );

    const homeTab = screen.getByTestId('tab-home');
    expect(homeTab).toHaveAttribute('aria-selected', 'true');

    const calendarTab = screen.getByTestId('tab-calendar');
    expect(calendarTab).toHaveAttribute('aria-selected', 'false');
  });
  it('navigates to correct path when tab is clicked', () => {
    render(
      <MemoryRouter>
        <MenuTabs />
      </MemoryRouter>,
    );

    const calendarTab = screen.getByTestId('tab-calendar');
    fireEvent.click(calendarTab);

    expect(mockNavigate).toHaveBeenCalledWith(`/${MainTabValues.CALENDAR}`);
  });
  it('handles missing tab parameter', () => {
    (useParams as jest.Mock).mockReturnValue({ tab: undefined });
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/' });

    render(
      <MemoryRouter>
        <MenuTabs />
      </MemoryRouter>,
    );

    const homeTab = screen.getByTestId('tab-home');
    expect(homeTab).toHaveAttribute('aria-selected', 'true');
  });

  it('handles calendar tab selection', () => {
    (useParams as jest.Mock).mockReturnValue({ tab: MainTabValues.CALENDAR });
    (useLocation as jest.Mock).mockReturnValue({
      pathname: `/${MainTabValues.CALENDAR}`,
    });

    render(
      <MemoryRouter>
        <MenuTabs />
      </MemoryRouter>,
    );

    const homeTab = screen.getByTestId('tab-home');
    const calendarTab = screen.getByTestId('tab-calendar');

    expect(homeTab).toHaveAttribute('aria-selected', 'false');
    expect(calendarTab).toHaveAttribute('aria-selected', 'true');
  });
});
