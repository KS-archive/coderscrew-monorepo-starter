import { ComponentPropsWithRef } from 'react';

import type { StyledCallback } from '@/types';
import { styled } from '@/utils';

import { FormFieldContextValue } from './form-field.context';
import { DEFAULT_FORM_SIZE } from './form-field.defaults';

export interface FormFieldErrorProps extends ComponentPropsWithRef<'div'> {
  size?: FormFieldContextValue['size'];
  children?: FormFieldContextValue['error'];
}

const sizesMap = { xs: 'xs', sm: 'xs', md: 'sm', lg: 'md', xl: 'lg' } as const;

const sizeStyles: StyledCallback<FormFieldErrorProps> = ({ theme, size = DEFAULT_FORM_SIZE }) =>
  theme.typography[sizesMap[size]];

const baseStyles: StyledCallback<FormFieldErrorProps> = ({ theme }) => ({
  color: theme.colors.error[500],
});

export const FormFieldError = styled.div<FormFieldErrorProps>(baseStyles, sizeStyles);
