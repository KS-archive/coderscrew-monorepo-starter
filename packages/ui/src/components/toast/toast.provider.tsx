import { ReactNode } from 'react';

import { Toaster, ToasterProps } from './toaster';

interface ToastProviderProps extends ToasterProps {
  children: ReactNode;
}

export const ToastProvider = ({ children, ...toasterProps }: ToastProviderProps) => (
  <>
    {children}
    <Toaster {...toasterProps} />
  </>
);
