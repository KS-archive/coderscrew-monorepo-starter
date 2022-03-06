import type { ReactNode } from 'react';
import styled from '@emotion/styled';

import { LanguagePicker } from '@ccms/client/i18n';

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
