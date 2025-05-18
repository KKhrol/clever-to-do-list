import React from 'react';

import { StyledTitleContainer } from './StyledTitle.styled';

type StyledTitleProps = React.ComponentPropsWithoutRef<'h2'> & {
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
};

export const StyledTitle: React.FC<StyledTitleProps> = ({
  size = 'xl',
  children,
  ...rest
}) => (
  <StyledTitleContainer
    size={size}
    {...rest}
  >
    {children}
  </StyledTitleContainer>
);

export default StyledTitle;
