import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const HomeContainer = styled('div')<{
  paddingHorizontal?: number;
}>(({ paddingHorizontal = 30 }) => ({
  width: '100%',
  height: '100%',
  padding: `40px ${paddingHorizontal}px 0 ${paddingHorizontal}px`,
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  margin: 0,
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(3),
  width: '100%',
}));

export const TitleWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  paddingLeft: '16px',
});
