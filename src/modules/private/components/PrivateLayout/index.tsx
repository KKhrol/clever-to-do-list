import React from 'react';

import Header from '@components/Header';
import LayoutContainer from '@components/LayoutContainer';

import { MainContent } from './PrivateLayout.styled';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => (
  <LayoutContainer data-testid="private-layout">
    <Header showMenu />
    <MainContent data-testid="private-layout-content">{children}</MainContent>
  </LayoutContainer>
);

export default PrivateLayout;
