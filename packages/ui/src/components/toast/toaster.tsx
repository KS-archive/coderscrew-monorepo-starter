import { Toast, useToaster } from 'react-hot-toast';
import { useTheme } from '@emotion/react';

import { styled } from '@/utils';

import type { ToastOptions } from './toast';
import { ToastCard } from './toast-card';

const DEFAULT_DURATION = 1000 * 3;

const ToastsContainer = styled.div({
  position: 'fixed',
  zIndex: 9999,
  top: 16,
  left: 0,
  right: 0,
  pointerEvents: 'none',
});

const ToastsBar = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  transition: 'all 230ms cubic-bezier(0.21, 1.02, 0.73, 1)',
});

export interface ToasterProps extends ToastOptions {
  maxCount?: number;
}

export const Toaster = ({ duration = DEFAULT_DURATION, maxCount = 1 }: ToasterProps) => {
  const { colors } = useTheme();
  const { toasts, handlers } = useToaster({
    duration,
    success: { iconTheme: { primary: colors.success[500], secondary: colors.white } },
    error: { iconTheme: { primary: colors.error[500], secondary: colors.white } },
    loading: { iconTheme: { primary: colors.info[500], secondary: colors.white } },
  });

  const getOffset = (toast: Toast) =>
    handlers.calculateOffset(toast, {
      reverseOrder: false,
      gutter: 8,
    });

  const getRefCallback = (toast: Toast) => (el: HTMLDivElement) => {
    if (el && !toast.height) {
      const { height } = el.getBoundingClientRect();

      handlers.updateHeight(toast.id, height);
    }
  };

  const toastsMapper = (toast: Toast) => {
    const offset = getOffset(toast);
    const ref = getRefCallback(toast);

    return (
      <ToastsBar ref={ref} key={toast.id} style={{ transform: `translateY(${offset}px)` }}>
        <ToastCard toast={toast} />
      </ToastsBar>
    );
  };

  return (
    <ToastsContainer onMouseEnter={handlers.startPause} onMouseLeave={handlers.endPause}>
      {toasts.map((toast, index) => toastsMapper(index < maxCount ? toast : { ...toast, visible: false }))}
    </ToastsContainer>
  );
};
