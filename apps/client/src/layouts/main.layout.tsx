import type { ReactNode } from 'react';

import { styled } from '@ccms/ui';

import { LanguagePicker } from '@/services/i18n';

interface MainLayoutProps {
  children: ReactNode;
}

const StyledLanguagePicker = styled(LanguagePicker)({
  position: 'fixed',
  top: 16,
  right: 16,
});

export const MainLayout = ({ children }: MainLayoutProps) => (
  <>
    <StyledLanguagePicker />
    {children}
  </>
);
