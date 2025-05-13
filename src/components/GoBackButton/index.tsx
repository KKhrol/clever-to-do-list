import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const GoBackButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <IconButton
      aria-label="Go back"
      onClick={() => navigate(-1)}
      size="large"
      edge="start"
      sx={{ color: 'inherit' }}
    >
      <ArrowBackIcon />
    </IconButton>
  );
};
