import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HomeIcon from '@mui/icons-material/Home';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MainTabValues } from 'src/constants/mainTabValues';

const menuItems = [
  {
    label: 'Home',
    path: `/${MainTabValues.HOME}`,
    value: MainTabValues.HOME,
    icon: <HomeIcon sx={{ fontSize: 24 }} />,
  },
  {
    label: 'Calendar',
    path: `/${MainTabValues.CALENDAR}`,
    value: MainTabValues.CALENDAR,
    icon: <CalendarTodayIcon sx={{ fontSize: 20 }} />,
  },
];

const MenuTabs: React.FC = () => {
  const { tab } = useParams<{ tab: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const getCurrentTabIndex = () => {
    if (tab) {
      const index = menuItems.findIndex(item => item.value === tab);
      if (index !== -1) return index;
    }

    return menuItems.findIndex(item =>
      item.path === '/'
        ? location.pathname === '/'
        : location.pathname.startsWith(item.path),
    );
  };
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    navigate(menuItems[newValue].path);
  };

  const currentTabIndex = getCurrentTabIndex();
  return (
    <Tabs
      value={currentTabIndex === -1 ? 0 : currentTabIndex}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      aria-label="navigation tabs"
      data-testid="menu-tabs"
    >
      {menuItems.map((item, _index) => (
        <Tab
          key={item.path}
          icon={item.icon}
          label={item.label}
          iconPosition="start"
          data-testid={`tab-${item.value}`}
          aria-label={`${item.label} tab`}
        />
      ))}
    </Tabs>
  );
};

export default MenuTabs;
