import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import type { CreateTask } from '@api/tasks/dto';

import useHandleForm from '@hooks/useHandleForm';

import AddTaskForm from './AddTaskForm';
import { TaskValidationRules, getDefaultTask } from './AddTaskForm/types';
import {
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  StyledDialog,
} from './AddTaskModal.styled';

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: CreateTask) => Promise<void>;
  initialValues?: CreateTask;
  mode?: 'add' | 'update';
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialValues,
  mode = 'add',
}) => {
  const defaultTask = React.useMemo(() => getDefaultTask(), []);
  const actualInitialValues = React.useMemo(
    () => initialValues || defaultTask,
    [initialValues, defaultTask],
  );

  const { t } = useTranslation(['common', 'errors']);
  const {
    values,
    errors,
    loading,
    handleSubmit,
    handleFieldChange,
    handleFieldFocus,
    handleFieldBlur,
    shouldShowFieldError,
    resetForm,
  } = useHandleForm({
    initialValues: actualInitialValues,
    onSubmit: async values => {
      await onSubmit(values);
      onClose();
    },
    submitErrorMessage: t('errors:taskModal.addTask'),
    validationRules: TaskValidationRules,
    validateOnChange: true,
    validateOnBlur: true,
  });

  useEffect(() => {
    if (open) {
      resetForm(mode === 'add' ? defaultTask : actualInitialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, mode]);

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      fullWidth
      aria-labelledby="add-task-dialog-title"
    >
      <ModalHeader id="add-task-dialog-title">
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ fontWeight: 700, fontSize: '1.4rem' }}
        >
          {mode === 'add'
            ? t('taskModal.addTaskTitle')
            : t('taskModal.updateTaskTitle')}
        </Typography>
        <ModalCloseButton
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </ModalCloseButton>
      </ModalHeader>

      <ModalContent>
        <AddTaskForm
          mode={mode}
          values={values}
          errors={errors}
          loading={loading}
          handleSubmit={handleSubmit}
          handleFieldChange={handleFieldChange}
          handleFieldFocus={handleFieldFocus}
          handleFieldBlur={handleFieldBlur}
          shouldShowFieldError={shouldShowFieldError}
          onClose={onClose}
        />
      </ModalContent>
    </StyledDialog>
  );
};

export default AddTaskModal;
