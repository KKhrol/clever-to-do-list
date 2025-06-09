import { t } from 'i18next';
import React from 'react';

import Menu from '@components/Menu';

import {
  HeaderCenterContainer,
  HeaderIcon,
  HeaderTitle,
  HeaderWrapper,
} from './Header.styled';

interface HeaderProps {
  showMenu?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showMenu = false }) => (
  <HeaderWrapper
    $justifyContent={showMenu ? 'space-between' : 'center'}
    data-testid="header-component"
  >
    <HeaderCenterContainer data-testid="header-center-container">
      <HeaderIcon data-testid="header-icon" />
      <HeaderTitle data-testid="header-title">
        {t('common:header.title')}
      </HeaderTitle>
    </HeaderCenterContainer>
    {showMenu && <Menu />}
  </HeaderWrapper>
);

export default Header;
