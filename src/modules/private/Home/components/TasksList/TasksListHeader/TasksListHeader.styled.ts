import { styled } from '@mui/material/styles';

export const HeaderContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${theme.palette.divider}`,
  paddingBottom: theme.spacing(2),
}));

export const TaskCountText = styled('h2')(({ theme }) => ({
  margin: 0,
  fontSize: '1.25rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const DateText = styled('div')(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.text.secondary,
}));
