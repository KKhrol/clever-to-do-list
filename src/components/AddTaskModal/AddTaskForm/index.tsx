import React from 'react';
import { useTranslation } from 'react-i18next';
import type { CreateTask } from 'src/api/tasks/dto';

import Spacer from '@components/Spacer';

import {
  ModalButton,
  ModalFooter,
  ModalForm,
  ScrollableContent,
} from './AddTaskForm.styled';
import ColorPickerSection from './sections/ColorPickerSection';
import DateTimeSection from './sections/DateTimeSection';
import DescriptionSection from './sections/DescriptionSection';
import PrioritySelectorSection from './sections/PrioritySelectorSection';
import TitleSection from './sections/TitleSection';
import { FieldNames } from './types';

interface AddTaskFormProps {
  mode: 'add' | 'update';
  values: CreateTask;
  errors: Record<string, string>;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  handleFieldChange: (field: keyof CreateTask) => (value: any) => void;
  handleFieldFocus: (field: keyof CreateTask) => void;
  handleFieldBlur: (field: keyof CreateTask) => void;
  shouldShowFieldError: (field: keyof CreateTask) => boolean;
  onClose: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({
  mode,
  values,
  errors,
  loading,
  handleSubmit,
  handleFieldChange,
  handleFieldFocus,
  handleFieldBlur,
  shouldShowFieldError,
  onClose,
}) => {
  const { t } = useTranslation(['common']);
  const buttonText =
    mode === 'add'
      ? t('taskModal.buttons.addTask')
      : t('taskModal.buttons.updateTask');

  const hasErrors = Object.values(errors).length > 0;

  return (
    <ModalForm
      onSubmit={handleSubmit}
      noValidate
    >
      <ScrollableContent>
        <TitleSection
          value={values[FieldNames.TITLE]}
          error={errors[FieldNames.TITLE]}
          shouldShowError={shouldShowFieldError(FieldNames.TITLE)}
          onChange={handleFieldChange(FieldNames.TITLE)}
          onFocus={() => handleFieldFocus(FieldNames.TITLE)}
          onBlur={() => handleFieldBlur(FieldNames.TITLE)}
        />

        <DescriptionSection
          value={values[FieldNames.DESCRIPTION] ?? ''}
          onChange={handleFieldChange('description')}
          maxRows={16}
        />

        <DateTimeSection
          values={values}
          errors={errors}
          handleFieldChange={handleFieldChange}
          handleFieldFocus={handleFieldFocus}
          handleFieldBlur={handleFieldBlur}
          shouldShowFieldError={shouldShowFieldError}
        />

        <Spacer height={10} />

        <PrioritySelectorSection
          value={values[FieldNames.PRIORITY]}
          onChange={handleFieldChange('priority')}
        />

        <ColorPickerSection
          value={values[FieldNames.COLOR]}
          onChange={handleFieldChange('color')}
        />
      </ScrollableContent>

      <ModalFooter elevation={3}>
        <ModalButton
          type="button"
          onClick={onClose}
          $variant="secondary"
          variant="text"
        >
          Cancel
        </ModalButton>
        <ModalButton
          type="submit"
          $variant="primary"
          variant="contained"
          disabled={loading || hasErrors}
        >
          {buttonText}
        </ModalButton>
      </ModalFooter>
    </ModalForm>
  );
};

export default AddTaskForm;
