import { ComponentPropsWithRef, ComponentType, forwardRef, VoidFunctionComponent } from 'react';
import styled from '@emotion/styled';

import type { StyledCallback } from '../../../types/styles';
import { FormFieldContextValue, useFormField } from '../form-field/form-field.context';
import { DEFAULT_FORM_SIZE } from '../form-field/form-field.defaults';

type InputVariant = 'filled' | 'outline';

export interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  size?: FormFieldContextValue['size'];
  variant?: InputVariant;
  invalid?: boolean;
  width?: number | string;
}

const sizesMap = {
  xs: { padding: '0 8px', height: 24, typographyKey: 'xs' },
  sm: { padding: '0 12px', height: 32, typographyKey: 'sm' },
  md: { padding: '0 16px', height: 40, typographyKey: 'md' },
  lg: { padding: '0 16px', height: 48, typographyKey: 'lg' },
  xl: { padding: '0 20px', height: 56, typographyKey: 'xl' },
} as const;

const sizeStyles: StyledCallback<InputProps> = ({ theme, size = DEFAULT_FORM_SIZE }) => {
  const { typographyKey, ...properties } = sizesMap[size];

  return { ...theme.typography[typographyKey], ...properties };
};

type VariantFunction = StyledCallback<{ invalid: InputProps['invalid'] }>;

const filledVariant: VariantFunction = ({ theme, invalid }) => ({
  backgroundColor: theme.colors.gray[100],
  borderColor: invalid ? theme.colors.error[500] : 'transparent',
  boxShadow: invalid ? `0 0 0 1px ${theme.colors.error[500]}` : 'none',

  '&:hover:enabled': {
    backgroundColor: theme.colors.gray[200],
  },

  '&:focus:enabled': {
    backgroundColor: 'transparent',
    borderColor: theme.colors.primary[500],
    boxShadow: `0 0 0 1px ${theme.colors.primary[500]}`,
  },
});

const outlineVariant: VariantFunction = ({ theme, invalid }) => ({
  backgroundColor: 'inherit',
  borderColor: invalid ? theme.colors.error[500] : theme.colors.gray[300],
  boxShadow: invalid ? `0 0 0 1px ${theme.colors.error[500]}` : 'none',

  '&:hover:enabled:not(:focus)': {
    borderColor: invalid ? theme.colors.error[600] : theme.colors.gray[400],
  },

  '&:focus:enabled': {
    borderColor: theme.colors.primary[500],
    boxShadow: `0 0 0 1px ${theme.colors.primary[500]}`,
  },
});

const variantsMap = { filled: filledVariant, outline: outlineVariant };

const variantStyles: StyledCallback<InputProps> = ({ theme, variant = 'filled', invalid }) =>
  variantsMap[variant]({ theme, invalid });

const baseStyles: StyledCallback<InputProps> = ({ theme, width = '100%' }) => ({
  width,
  minWidth: 0,
  position: 'relative',
  appearance: 'none',
  boxSizing: 'border-box',
  border: '1px solid',
  color: theme.colors.gray[800],
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

const StyledInput = styled.input<InputProps>(
  baseStyles,
  sizeStyles,
  variantStyles
) as VoidFunctionComponent<InputProps>;

export const Input: ComponentType<InputProps> = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const fieldData = useFormField();

  const invalid = props.invalid ?? Boolean(fieldData.error);
  const size = props.size ?? fieldData.size;

  return <StyledInput {...props} invalid={invalid} size={size} ref={ref} />;
});
