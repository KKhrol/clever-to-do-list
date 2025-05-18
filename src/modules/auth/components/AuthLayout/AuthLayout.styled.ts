import { Box, Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AuthWrapper = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  alignItems: 'flex-start',
  paddingTop: '13vh',
  justifyContent: 'center',
  width: '100%',
}));

export const StyledContainer = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: `${theme.breakpoints.values.sm / 2}px`,
  maxWidth: `${(theme.breakpoints.values.sm + theme.breakpoints.values.md) / 2}px`,
}));

export const AuthPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  borderRadius: theme.shape.borderRadius * 2,
}));
