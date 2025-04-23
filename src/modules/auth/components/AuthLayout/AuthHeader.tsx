import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import HeaderWrapper from '@components/HeaderWrapper';

const HeaderIcon = styled(ChecklistRtlIcon)(({ theme }) => ({
  fontSize: theme.typography.xl.fontSize,
  color: theme.palette.primary.main,
}));

const HeaderTitle = styled(Typography)({
  fontWeight: 600,
});

function AuthHeader() {
  return (
    <HeaderWrapper>
      <HeaderIcon />
      <HeaderTitle variant="xl">Clever To-Do List</HeaderTitle>
    </HeaderWrapper>
  );
}

export default AuthHeader;
