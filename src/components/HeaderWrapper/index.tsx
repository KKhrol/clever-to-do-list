import { styled } from '@mui/material/styles';

interface HeaderWrapperProps extends React.HTMLAttributes<HTMLElement> {
  $justifyContent?: React.CSSProperties['justifyContent'];
}

const HeaderWrapper = styled('header')<HeaderWrapperProps>(
  ({ theme, $justifyContent = 'center' }) => ({
    height: '70px',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: $justifyContent,
    gap: theme.spacing(1),
    color: theme.palette.text.primary,
    zIndex: theme.zIndex.appBar,
    boxShadow: `0 2px 8px ${theme.palette.primary.main}30`,
  }),
);

export default HeaderWrapper;
