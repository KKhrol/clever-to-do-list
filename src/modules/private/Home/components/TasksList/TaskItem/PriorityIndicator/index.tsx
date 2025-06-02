import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import RemoveIcon from '@mui/icons-material/Remove';
import { Typography } from '@mui/material';
import React from 'react';
import { TaskPriority } from 'src/constants/taskPriority.enum';
import { PriorityColors } from 'src/theme/constants';

import { PriorityWrapper } from './PriorityIndicator.styled';

interface PriorityIndicatorProps {
  priority: TaskPriority;
}

const PriorityIndicator: React.FC<PriorityIndicatorProps> = ({ priority }) => {
  const getPriorityIcon = () => {
    switch (priority) {
      case TaskPriority.HIGH:
        return <ArrowUpwardIcon fontSize="small" />;
      case TaskPriority.MEDIUM:
        return <RemoveIcon fontSize="small" />;
      default:
        return <ArrowDownwardIcon fontSize="small" />;
    }
  };

  const getPriorityText = () => {
    switch (priority) {
      case TaskPriority.HIGH:
        return 'High';
      case TaskPriority.MEDIUM:
        return 'Medium';
      case TaskPriority.LOW:
        return 'Low';
      default:
        return 'None';
    }
  };

  return (
    <PriorityWrapper priorityColor={PriorityColors[priority]}>
      {getPriorityIcon()}
      <Typography
        variant="caption"
        fontWeight="bold"
      >
        {getPriorityText()}
      </Typography>
    </PriorityWrapper>
  );
};

export default PriorityIndicator;
