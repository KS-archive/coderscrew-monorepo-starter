import { createContext, ReactNode, useContext, useMemo } from 'react';

import { DEFAULT_FORM_ERROR, DEFAULT_FORM_SIZE } from './form-field.defaults';

type FormFieldSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface FormFieldContextValue {
  size: FormFieldSize;
  error: string;
}

export interface FormFieldProviderProps extends Partial<FormFieldContextValue> {
  children: ReactNode;
}

const FormFieldContext = createContext<FormFieldContextValue>({
  size: DEFAULT_FORM_SIZE,
  error: DEFAULT_FORM_ERROR,
});

export const useFormField = () => useContext(FormFieldContext);

export const FormFieldProvider = ({ children, size, error }: FormFieldProviderProps) => {
  const value = useMemo(() => ({ size: size ?? DEFAULT_FORM_SIZE, error: error ?? DEFAULT_FORM_ERROR }), [size, error]);

  return <FormFieldContext.Provider value={value}>{children}</FormFieldContext.Provider>;
};
