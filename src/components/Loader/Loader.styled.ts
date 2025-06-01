import { keyframes, styled } from '@mui/material/styles';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

interface LoaderContainerProps {
  size?: 'small' | 'medium' | 'large';
}

export const LoaderContainer = styled('div')<LoaderContainerProps>(
  ({ size, theme }) => ({
    display: 'inline-block',
    width:
      size === 'small'
        ? theme.spacing(2)
        : size === 'large'
          ? theme.spacing(4)
          : theme.spacing(3),
    height:
      size === 'small'
        ? theme.spacing(2)
        : size === 'large'
          ? theme.spacing(4)
          : theme.spacing(3),
  }),
);

export const Spinner = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  border: `2px solid ${theme.palette.grey[200]}`,
  borderTop: `2px solid ${theme.palette.primary.main}`,
  borderRadius: '50%',
  animation: `${spin} 1s linear infinite`,
}));

export const LoaderWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100%',
}));
