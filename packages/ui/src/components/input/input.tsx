import type { FocusEvent, VoidFunctionComponent } from 'react';

import { styled } from '@/theme';
import type { StyledCallback } from '@/types';

type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type InputVariant = 'filled' | 'outline';

export interface InputProps {
  size?: InputSize;
  variant?: InputVariant;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
}

const sizesMap = {
  xs: { padding: '0 8px', height: 24, typographyKey: 'xs' },
  sm: { padding: '0 12px', height: 32, typographyKey: 'sm' },
  md: { padding: '0 16px', height: 40, typographyKey: 'md' },
  lg: { padding: '0 16px', height: 48, typographyKey: 'lg' },
  xl: { padding: '0 20px', height: 56, typographyKey: 'lg' },
} as const;

const sizeStyles: StyledCallback<InputProps> = ({ theme, size = 'md' }) => {
  const { typographyKey, ...properties } = sizesMap[size];

  return { ...theme.typography[typographyKey], ...properties };
};

type VariantFunction = StyledCallback<{ invalid: InputProps['invalid'] }>;

const filledVariant: VariantFunction = ({ theme, invalid }) => ({
  backgroundColor: theme.colors.gray[100],
  border: '2px solid',
  borderColor: invalid ? theme.colors.error[500] : 'transparent',

  '&:hover:enabled': {
    backgroundColor: theme.colors.gray[200],
  },

  '&:focus:enabled': {
    backgroundColor: 'transparent',
    borderColor: theme.colors.primary[500],
  },
});

const outlineVariant: VariantFunction = ({ theme, invalid }) => ({
  backgroundColor: 'inherit',
  border: '1px solid',
  borderColor: invalid ? theme.colors.error[500] : theme.colors.gray[300],
  boxShadow: invalid ? `0 0 0 1px ${theme.colors.error[500]}` : 'none',

  '&:hover:enabled': {
    borderColor: invalid ? theme.colors.error[600] : theme.colors.gray[400],
  },

  '&:focus:enabled': {
    borderColor: invalid ? theme.colors.error[500] : theme.colors.primary[500],
    boxShadow: `0 0 0 1px ${invalid ? theme.colors.error[500] : theme.colors.primary[500]}`,
  },
});

const variantsMap = { filled: filledVariant, outline: outlineVariant };

const variantStyles: StyledCallback<InputProps> = ({ theme, variant = 'filled', invalid }) =>
  variantsMap[variant]({ theme, invalid });

const baseStyles: StyledCallback<InputProps> = ({ theme }) => ({
  width: '100%',
  minWidth: 0,
  position: 'relative',
  appearance: 'none',
  boxSizing: 'border-box',
  fontWeight: theme.fontWeights.normal,
  borderRadius: 6,
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.225s ease-out',
  outline: 'none',

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export const Input = styled.input<InputProps>(
  baseStyles,
  sizeStyles,
  variantStyles
) as VoidFunctionComponent<InputProps>;
