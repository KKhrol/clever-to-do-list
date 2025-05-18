import React from 'react';
import { useTranslation } from 'react-i18next';

import { FormGroup, ModalLabel, StyledTextField } from './sections.styled';

interface TitleInputFieldProps {
  value: string;
  error?: string;
  shouldShowError: boolean;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}

const TitleSection: React.FC<TitleInputFieldProps> = ({
  value,
  error,
  shouldShowError,
  onChange,
  onFocus,
  onBlur,
}) => {
  const { t } = useTranslation(['common', 'errors']);

  return (
    <FormGroup>
      <ModalLabel htmlFor="task-title">{t('taskModal.form.title')}</ModalLabel>

      <StyledTextField
        required
        fullWidth
        size="small"
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        autoComplete="off"
        error={shouldShowError}
        helperText={
          shouldShowError ? t(`errors:taskModal.errors.${error}`) : ''
        }
      />
    </FormGroup>
  );
};

export default TitleSection;
