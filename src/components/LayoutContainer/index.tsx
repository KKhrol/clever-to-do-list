import React from 'react';

import type { LayoutContainerProps } from './LayoutContainer.styled';
import { LayoutContainerWrapper } from './LayoutContainer.styled';

const LayoutContainer: React.FC<
  React.PropsWithChildren<LayoutContainerProps>
> = props => (
  <LayoutContainerWrapper
    data-testid="layout-container"
    {...props}
  >
    {props.children}
  </LayoutContainerWrapper>
);

export default LayoutContainer;
