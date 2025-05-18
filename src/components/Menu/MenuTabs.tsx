import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HomeIcon from '@mui/icons-material/Home';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
  { label: 'Home', path: '/', icon: <HomeIcon sx={{ fontSize: 24 }} /> },
  {
    label: 'Calendar',
    path: '/calendar',
    icon: <CalendarTodayIcon sx={{ fontSize: 20 }} />,
  },
];

const MenuTabs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentTab = menuItems.findIndex(item =>
    item.path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(item.path),
  );
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    navigate(menuItems[newValue].path);
  };

  return (
    <Tabs
      value={currentTab === -1 ? 0 : currentTab}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      aria-label="navigation tabs"
    >
      {menuItems.map(item => (
        <Tab
          key={item.path}
          icon={item.icon}
          label={item.label}
          iconPosition="start"
        />
      ))}
    </Tabs>
  );
};

export default MenuTabs;
