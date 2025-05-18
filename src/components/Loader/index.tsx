import React from 'react';

import { LoaderContainer, Spinner } from './Loader.styled';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  className,
}) => {
  return (
    <LoaderContainer
      size={size}
      className={className}
    >
      <Spinner />
    </LoaderContainer>
  );
};

export default Loader;
