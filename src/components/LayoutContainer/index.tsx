import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface LayoutContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  $alignItems?: React.CSSProperties['alignItems'];
  $flexDirection?: React.CSSProperties['flexDirection'];
  $width?: React.CSSProperties['width'];
  $overflow?: React.CSSProperties['overflow'];
}

const LayoutContainer = styled(Box)<LayoutContainerProps>(
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

export default LayoutContainer;
