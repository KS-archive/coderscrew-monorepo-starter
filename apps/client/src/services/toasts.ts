import { toast, ToastProvider } from '@ccms/ui';

export const Toasts = {
  Provider: ToastProvider,
  ...toast,
};
