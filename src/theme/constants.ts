import type { TaskPriority } from 'src/constants/taskPriority.enum';

export const FontSizes = {
  xxl: '32px',
  xl: '28px',
  lg: '24px',
  md: '16px',
  sm: '14px',
  xs: '12px',
} as const;

export const ThemeVariants = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const PriorityColors: Record<TaskPriority, string> = {
  low: '#FFD600',
  medium: '#FF9800',
  high: '#F44336',
} as const;
