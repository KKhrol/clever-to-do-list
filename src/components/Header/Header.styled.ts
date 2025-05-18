import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface HeaderWrapperProps extends React.HTMLAttributes<HTMLElement> {
  $justifyContent?: React.CSSProperties['justifyContent'];
}

export const HeaderWrapper = styled('header')<HeaderWrapperProps>(
  ({ theme, $justifyContent = 'center' }) => ({
    height: '70px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: $justifyContent,
    gap: theme.spacing(1),
    color: theme.palette.text.primary,
    zIndex: theme.zIndex.appBar,
    boxShadow: `0 2px 8px ${theme.palette.primary.main}30`,
  }),
);

export const HeaderIcon = styled(ChecklistRtlIcon)(({ theme }) => ({
  fontSize: theme.typography.xl.fontSize,
  color: theme.palette.primary.main,
}));

export const HeaderTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: '1.2rem',
});

export const HeaderCenterContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginLeft: theme.spacing(2),
}));
