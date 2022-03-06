import { StrictMode } from 'react';

import { RoutingProvider } from '@ccms/client/routing';
import { ThemeProvider, ToastProvider } from '@ccms/ui';

import { MainLayout } from './layouts/main.layout';
import { Routes } from './routes';

export const App = () => (
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <RoutingProvider>
          <MainLayout>
            <Routes />
          </MainLayout>
        </RoutingProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>
);
