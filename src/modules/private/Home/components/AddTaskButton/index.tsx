import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  ButtonContent,
  IconWrapper,
  StyledAddTaskButton,
} from './AddTaskButton.styled';

interface AddTaskButtonProps {
  onClick: () => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick }) => {
  const { t } = useTranslation(['common']);
  return (
    <StyledAddTaskButton onClick={onClick}>
      <ButtonContent>
        <IconWrapper>
          <AddIcon fontSize="small" />
        </IconWrapper>
        {t('homePage.addNewTask')}
      </ButtonContent>
    </StyledAddTaskButton>
  );
};

export default AddTaskButton;
