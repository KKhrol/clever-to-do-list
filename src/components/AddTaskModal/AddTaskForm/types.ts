import { formatDateToYYYYMMDD, formatTimeToHHMM } from '@utils/date-formatters';
import moment from 'moment';
import { TaskPriority } from 'src/constants/taskPriority.enum';

import type { CreateTask } from '@api/tasks/dto';

import type { FieldValidation } from '@hooks/useHandleForm';

export enum FieldNames {
  TITLE = 'title',
  DESCRIPTION = 'description',
  START_DATE = 'startDate',
  START_TIME = 'startTime',
  END_DATE = 'endDate',
  END_TIME = 'endTime',
  PRIORITY = 'priority',
  COLOR = 'color',
}

export interface IFormValues {
  [FieldNames.TITLE]: string;
  [FieldNames.DESCRIPTION]?: string;
  [FieldNames.START_DATE]: string;
  [FieldNames.START_TIME]: string;
  [FieldNames.END_DATE]: string;
  [FieldNames.END_TIME]: string;
  [FieldNames.PRIORITY]: string;
  [FieldNames.COLOR]: string;
}

export interface IErrorData {
  [FieldNames.TITLE]?: string;
  [FieldNames.DESCRIPTION]?: string;
  [FieldNames.START_DATE]?: string;
  [FieldNames.START_TIME]?: string;
  [FieldNames.END_DATE]?: string;
  [FieldNames.END_TIME]?: string;
  [FieldNames.PRIORITY]?: string;
  [FieldNames.COLOR]?: string;
}

export const getDefaultTask = (): CreateTask => {
  const now = moment();
  const oneHourLater = moment(now).add(1, 'hour');

  return {
    title: '',
    description: '',
    startDate: formatDateToYYYYMMDD(now.toDate()),
    startTime: formatTimeToHHMM(now.toDate()),
    endDate: formatDateToYYYYMMDD(oneHourLater.toDate()),
    endTime: formatTimeToHHMM(oneHourLater.toDate()),
    priority: TaskPriority.MEDIUM,
    color: '#3498db',
  };
};

export const ColorTaskOptions = [
  '#3498db',
  '#2ecc71',
  '#f37950',
  '#9b59b6',
  '#1abc9c',
  '#d35459',
  '#f1c44f',
];

export const PriorityTaskOptions: TaskPriority[] = [
  TaskPriority.LOW,
  TaskPriority.MEDIUM,
  TaskPriority.HIGH,
];

const validateDateTimeOrder = (allValues: IFormValues): boolean => {
  if (
    !allValues[FieldNames.START_DATE] ||
    !allValues[FieldNames.START_TIME] ||
    !allValues[FieldNames.END_DATE] ||
    !allValues[FieldNames.END_TIME]
  ) {
    return true;
  }

  try {
    const startDateTime = moment(
      `${allValues[FieldNames.START_DATE]}T${allValues[FieldNames.START_TIME]}`,
    );
    const endDateTime = moment(
      `${allValues[FieldNames.END_DATE]}T${allValues[FieldNames.END_TIME]}`,
    );

    if (!startDateTime.isValid() || !endDateTime.isValid()) {
      return false;
    }

    return endDateTime.isAfter(startDateTime);
  } catch {
    return false;
  }
};

export const TaskValidationRules: FieldValidation<CreateTask> = {
  [FieldNames.TITLE]: [
    {
      validate: (v: string) => !!v.trim(),
      errorMessage: 'titleRequired',
    },
  ],
  [FieldNames.START_DATE]: [
    {
      validate: (v: string) => !!v,
      errorMessage: 'startDateRequired',
    },
    {
      validate: (_v: string, allValues: IFormValues) =>
        validateDateTimeOrder(allValues),
      errorMessage: 'startDateMustBeBeforeEndDate',
    },
  ],
  [FieldNames.START_TIME]: [
    {
      validate: (v: string) => !!v,
      errorMessage: 'startTimeRequired',
    },
    {
      validate: (_v: string, allValues: IFormValues) =>
        validateDateTimeOrder(allValues),
      errorMessage: 'startDateMustBeBeforeEndDate',
    },
  ],
  [FieldNames.END_DATE]: [
    {
      validate: (v: string) => !!v,
      errorMessage: 'endDateRequired',
    },
    {
      validate: (_v: string, allValues: IFormValues) =>
        validateDateTimeOrder(allValues),
      errorMessage: 'endTimeMustBeAfterStartTime',
    },
  ],
  [FieldNames.END_TIME]: [
    {
      validate: (v: string) => !!v,
      errorMessage: 'endTimeRequired',
    },
    {
      validate: (_v: string, allValues: IFormValues) =>
        validateDateTimeOrder(allValues),
      errorMessage: 'endTimeMustBeAfterStartTime',
    },
  ],
};
