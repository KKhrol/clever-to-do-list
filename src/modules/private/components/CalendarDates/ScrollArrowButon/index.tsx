import React from 'react';

import { ScrollButton } from './ScrollArrowButton.styled';

interface ScrollArrowButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  position: 'left' | 'right';
  style?: React.CSSProperties;
}

export const ScrollArrowButton: React.FC<ScrollArrowButtonProps> = ({
  onClick,
  icon,
  position,
  style,
}) => {
  return (
    <ScrollButton
      onClick={onClick}
      style={{
        ...(position === 'left' ? { left: 0 } : { right: 0 }),
        ...style,
      }}
    >
      {icon}
    </ScrollButton>
  );
};
