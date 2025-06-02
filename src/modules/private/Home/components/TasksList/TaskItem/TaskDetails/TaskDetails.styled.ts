import { styled } from '@mui/material/styles';

export const DetailsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

export const TaskTitle = styled('div')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

export const TaskTime = styled('div')(({ theme }) => ({
  fontSize: '0.85rem',
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.5),
}));
