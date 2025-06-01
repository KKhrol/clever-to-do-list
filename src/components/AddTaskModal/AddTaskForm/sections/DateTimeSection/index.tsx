import { Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { CreateTask } from 'src/api/tasks/dto';

import Spacer from '@components/Spacer';

import { FieldNames } from '../../types';
import { ErrorText } from '../sections.styled';
import DateTimeItem from './DateTimeItem';

interface IDateTimeSectionProps {
  values: CreateTask;
  errors: Record<string, string>;
  handleFieldChange: (field: keyof CreateTask) => (value: any) => void;
  handleFieldFocus: (field: keyof CreateTask) => void;
  handleFieldBlur: (field: keyof CreateTask) => void;
  shouldShowFieldError: (field: keyof CreateTask) => boolean;
}

const DateTimeSection: React.FC<IDateTimeSectionProps> = ({
  values,
  errors,
  handleFieldChange,
  handleFieldFocus,
  handleFieldBlur,
  shouldShowFieldError,
}) => {
  const { t } = useTranslation(['common']);

  const hasStartDateError =
    (shouldShowFieldError(FieldNames.START_DATE) &&
      errors[FieldNames.START_DATE]) ||
    (shouldShowFieldError(FieldNames.END_DATE) && errors[FieldNames.END_DATE]);
  const hasStartTimeError =
    shouldShowFieldError(FieldNames.START_TIME) &&
    errors[FieldNames.START_TIME];
  const hasEndDateError =
    shouldShowFieldError(FieldNames.END_DATE) && errors[FieldNames.END_DATE];
  const hasEndTimeError =
    shouldShowFieldError(FieldNames.END_TIME) && errors[FieldNames.END_TIME];

  const firstError = hasStartDateError
    ? errors[FieldNames.START_DATE]
    : hasStartTimeError
      ? errors[FieldNames.START_TIME]
      : hasEndDateError
        ? errors[FieldNames.END_DATE]
        : hasEndTimeError
          ? errors[FieldNames.END_TIME]
          : '';

  const hasDateTimeOrderError =
    firstError?.includes('endTimeMustBeAfterStartTime') ||
    firstError?.includes('startDateMustBeBeforeEndDate');

  const showIndividualErrors = !hasDateTimeOrderError;

  return (
    <Box>
      <DateTimeItem
        label={t('taskModal.form.startDateTime')}
        type={'start'}
        values={values}
        fieldErrors={errors}
        shouldShowFieldError={field =>
          showIndividualErrors && shouldShowFieldError(field)
        }
        onFieldBlur={handleFieldBlur}
        onFieldFocus={handleFieldFocus}
        onFieldChange={handleFieldChange}
      />
      <Spacer height={18} />
      <DateTimeItem
        label={t('taskModal.form.endDateTime')}
        type={'end'}
        values={values}
        fieldErrors={errors}
        shouldShowFieldError={field =>
          showIndividualErrors && shouldShowFieldError(field)
        }
        onFieldBlur={handleFieldBlur}
        onFieldFocus={handleFieldFocus}
        onFieldChange={handleFieldChange}
      />

      {firstError && (
        <Box mt={1}>
          <ErrorText>{t(`errors:taskModal.errors.${firstError}`)}</ErrorText>
        </Box>
      )}
    </Box>
  );
};

export default DateTimeSection;
