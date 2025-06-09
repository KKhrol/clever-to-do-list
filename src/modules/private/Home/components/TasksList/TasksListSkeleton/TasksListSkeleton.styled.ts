import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SkeletonContainer = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(3),
  borderRadius: '16px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '200px',
  boxSizing: 'border-box',
}));

export const HeaderContainer = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(3),
  textAlign: 'center',
}));

export const LoadingText = styled('h3')(({ theme }) => ({
  margin: 0,
  fontSize: '1.1rem',
  fontWeight: 500,
  color: theme.palette.text.secondary,
}));
