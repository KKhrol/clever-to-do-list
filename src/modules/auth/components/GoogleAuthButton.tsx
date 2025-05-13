import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button } from '@mui/material';

interface GoogleAuthButtonProps {
  disabled: boolean;
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const GoogleAuthButton = ({
  disabled,
  onClick,
  label,
}: GoogleAuthButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(e);
  };

  return (
    <Box px={2}>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={handleClick}
        disabled={disabled}
        sx={{ py: 1.3 }}
      >
        {label}
      </Button>
    </Box>
  );
};

export default GoogleAuthButton;
