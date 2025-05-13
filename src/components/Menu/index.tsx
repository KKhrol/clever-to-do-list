import React from 'react';

import LogOutButton from '../LogOutButton';
import { MenuContainer } from './Menu.styled';
import MenuTabs from './MenuTabs';

const Menu: React.FC = () => (
  <MenuContainer>
    <MenuTabs />
    <LogOutButton />
  </MenuContainer>
);

export default Menu;
