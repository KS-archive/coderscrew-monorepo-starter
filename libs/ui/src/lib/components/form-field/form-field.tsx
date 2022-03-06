import { ComponentPropsWithRef, ComponentType, forwardRef } from 'react';
import styled from '@emotion/styled';
import { nanoid } from 'nanoid';

import { FormFieldProvider, FormFieldProviderProps } from './form-field.context';
import { FormFieldError } from './form-field-error';

export interface FormFieldProps extends FormFieldProviderProps, Omit<ComponentPropsWithRef<'div'>, 'children'> {}

const FORM_ERROR_CLASS = `form-error-${nanoid(8)}`;

const FormFieldContainer = styled.div({
  [`.${FORM_ERROR_CLASS}`]: {
    marginTop: 4,
  },
});

export const FormField: ComponentType<FormFieldProps> = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ children, size, error, ...props }, ref) => (
    <FormFieldProvider size={size} error={error}>
      <FormFieldContainer {...props} ref={ref}>
        {children}
        {error && (
          <FormFieldError className={FORM_ERROR_CLASS} size={size}>
            {error}
          </FormFieldError>
        )}
      </FormFieldContainer>
    </FormFieldProvider>
  )
);
