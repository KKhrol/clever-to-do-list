import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export interface LayoutContainerProps {
  $alignItems?: React.CSSProperties['alignItems'];
  $flexDirection?: React.CSSProperties['flexDirection'];
  $width?: React.CSSProperties['width'];
  $overflow?: React.CSSProperties['overflow'];
}

export const LayoutContainerWrapper = styled(Box)<LayoutContainerProps>(
  ({
    theme,
    $alignItems = 'center',
    $flexDirection = 'column',
    $width = '100%',
    $overflow = 'hidden',
  }) => ({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: $flexDirection,
    alignItems: $alignItems,
    width: $width,
    backgroundColor: theme.palette.background.paper,
    overflow: $overflow,
  }),
);
