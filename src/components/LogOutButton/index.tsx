import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';

import { useAuth } from '@context/auth/AuthContext';

import { StyledLogOutIconButton } from './LogOutButton.styled';

const LogOutButton: React.FC = () => {
  const { logout } = useAuth();
  // TODO: Add modal to confirm logout

  return (
    <Tooltip
      title="Log out"
      arrow
    >
      <StyledLogOutIconButton
        color="error"
        onClick={logout}
      >
        <LogoutIcon sx={{ fontSize: 24 }} />
      </StyledLogOutIconButton>
    </Tooltip>
  );
};

export default LogOutButton;
