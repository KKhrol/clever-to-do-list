import CheckIcon from '@mui/icons-material/Check';
import React from 'react';

import {
  CircleCheckbox,
  CustomCheckedIcon,
  CustomIcon,
} from './TaskCheckbox.styled';

interface TaskCheckboxProps {
  checked: boolean;
  onChange: () => void;
  color: string;
}
const TaskCheckbox: React.FC<TaskCheckboxProps> = ({
  checked,
  onChange,
  color,
}) => {
  return (
    <CircleCheckbox
      checked={checked}
      onChange={onChange}
      customColor={color}
      icon={<CustomIcon customColor={color} />}
      checkedIcon={
        <CustomCheckedIcon customColor={color}>
          <CheckIcon style={{ fontSize: '12px' }} />
        </CustomCheckedIcon>
      }
    />
  );
};

export default TaskCheckbox;
