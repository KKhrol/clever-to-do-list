import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface SpacerProps {
  size?: number;
  axis?: 'horizontal' | 'vertical';
  flex?: boolean;
  height?: number | string;
}

const Spacer = styled(Box)<SpacerProps>(
  ({ theme, size = 1, axis = 'vertical', flex, height }) => ({
    ...(axis === 'horizontal'
      ? {
          width: theme.spacing(size),
          height: 1,
        }
      : {
          width: 1,
          height: height || theme.spacing(size),
        }),
    ...(flex && {
      flex: 1,
    }),
  }),
);

export default Spacer;
