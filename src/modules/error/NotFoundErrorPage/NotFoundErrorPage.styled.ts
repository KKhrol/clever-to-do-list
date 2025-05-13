import { styled } from '@mui/material/styles';

export const ErrorContainer = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
});

export const ErrorTitle = styled('h1')(({ theme }) => ({
  fontWeight: 700,
  fontSize: '2rem',
  marginBottom: theme.spacing(1),
}));

export const ErrorMessage = styled('p')(({ theme }) => ({
  fontSize: '1.1rem',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(3),
}));

export const ErrorButton = styled('button')(({ theme }) => ({
  padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
  fontSize: '1rem',
  borderRadius: theme.shape.borderRadius,
  border: 'none',
  background: theme.palette.primary.main,
  color: '#fff',
  cursor: 'pointer',
  fontWeight: 600,
  transition: 'background 0.2s',
  '&:hover': {
    background: theme.palette.primary.dark,
  },
}));
