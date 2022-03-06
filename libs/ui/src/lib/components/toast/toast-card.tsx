import { Toast, ToastIcon } from 'react-hot-toast';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const enter = keyframes`
  0% { transform: translate3d(0, -200%, 0) scale(0.6); opacity: 0.5; }
  100% { transform: translate3d(0, 0, 0) scale(1); opacity: 1; }
`;

const exit = keyframes`
  0% { transform: translate3d(0, 0, -1px) scale(1); opacity: 1; }
  100% { transform: translate3d(0, -150%, -1px) scale(0.6); opacity: 0; }
`;

const ToastBarBase = styled.div<{ visible: boolean }>(
  ({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    background: theme.colors.white,
    willChange: 'transform',
    boxShadow: theme.shadows.lg,
    maxWidth: 240,
    pointerEvents: 'auto',
    padding: '8px 12px',
    borderRadius: 8,
  }),
  ({ visible }) => ({
    animation: visible
      ? `${enter} 0.3s cubic-bezier(0.21, 1.02, 0.73, 1) forwards`
      : `${exit} 0.6s forwards cubic-bezier(0.06, 0.71, 0.55, 1)`,
  })
);

const Message = styled.div(({ theme }) => ({
  padding: '0 8px',
  whiteSpace: 'pre-line',
  color: theme.colors.gray[700],
  ...theme.typography.md,
}));

interface ToastCardProps {
  toast: Toast;
}

export const ToastCard = ({ toast }: ToastCardProps) => (
  <ToastBarBase visible={toast.visible}>
    <ToastIcon toast={toast} />
    <Message {...toast.ariaProps}>{toast.message}</Message>
  </ToastBarBase>
);
