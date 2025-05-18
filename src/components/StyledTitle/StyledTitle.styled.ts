import { styled } from '@mui/material/styles';
import { FontSizes } from 'src/theme/constants';

export const StyledTitleContainer = styled('h2')<{
  size?: keyof typeof FontSizes;
}>(({ theme, size = 'xxl' }) => ({
  fontSize: FontSizes[size],
  fontWeight: 700,
  margin: '0',
  color: theme.palette.text.primary,
  letterSpacing: 1,
}));
