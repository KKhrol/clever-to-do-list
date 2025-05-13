import React from 'react';

import Header from '@components/Header';
import LayoutContainer from '@components/LayoutContainer';

import { MainContent } from './PrivateLayout.styled';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => (
  <LayoutContainer>
    <Header showMenu />
    <MainContent>{children}</MainContent>
  </LayoutContainer>
);

export default PrivateLayout;
