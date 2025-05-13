import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

export const StyledLogOutIconButton = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: theme.spacing(1.5),
  boxShadow: 'none',
}));
