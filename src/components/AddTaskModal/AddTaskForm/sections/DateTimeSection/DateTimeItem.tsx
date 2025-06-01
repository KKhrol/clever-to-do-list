import { FormGroup } from '@mui/material';

import type { IErrorData, IFormValues } from '../../types';
import { FieldNames } from '../../types';
import {
  DateInputWrapper,
  DateTimeContainer,
  ModalLabel,
  StyledTextField,
  TimeInputWrapper,
} from '../sections.styled';

interface DateTimeSectionProps {
  label: string;
  values: IFormValues;
  type: 'start' | 'end';
  fieldErrors: IErrorData;
  shouldShowFieldError: (field: FieldNames) => boolean;
  onFieldBlur: (field: FieldNames) => void;
  onFieldFocus: (field: FieldNames) => void;
  onFieldChange: (field: FieldNames) => (value: string) => void;
}

const DateTimeItem: React.FC<DateTimeSectionProps> = ({
  label,
  values,
  type,
  fieldErrors,
  onFieldChange,
  onFieldBlur,
  onFieldFocus,
  shouldShowFieldError,
}) => {
  const dateField =
    type === 'start' ? FieldNames.START_DATE : FieldNames.END_DATE;
  const timeField =
    type === 'start' ? FieldNames.START_TIME : FieldNames.END_TIME;

  const dateValue = values[dateField];
  const timeValue = values[timeField];

  const dateError = shouldShowFieldError(dateField)
    ? fieldErrors[dateField]
    : undefined;
  const timeError = shouldShowFieldError(timeField)
    ? fieldErrors[timeField]
    : undefined;

  return (
    <FormGroup>
      <ModalLabel>{label}</ModalLabel>
      <DateTimeContainer>
        <DateInputWrapper>
          <StyledTextField
            type="date"
            id={`task-${type}-date`}
            fullWidth
            value={dateValue}
            onChange={e => onFieldChange(dateField)(e.target.value)}
            onFocus={() => onFieldFocus(dateField)}
            onBlur={() => onFieldBlur(dateField)}
            error={Boolean(dateError)}
            size="small"
            required
          />
        </DateInputWrapper>
        <TimeInputWrapper>
          <StyledTextField
            type="time"
            id={`task-${type}-time`}
            fullWidth
            value={timeValue}
            onChange={e => onFieldChange(timeField)(e.target.value)}
            onFocus={() => onFieldFocus(timeField)}
            onBlur={() => onFieldBlur(timeField)}
            error={Boolean(timeError)}
            size="small"
            required
          />
        </TimeInputWrapper>
      </DateTimeContainer>
    </FormGroup>
  );
};

export default DateTimeItem;
