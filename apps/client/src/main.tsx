import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@ccms/ui';

import { initializeAuthModule } from '@/modules/auth';
import { RoutingProvider } from '@/services/routing';
import { ToastProvider } from '@/services/toasts';

import { MainLayout } from './layouts/main.layout';
import { dashboardRoute } from './pages/dashboard/dashboard.route';
import { routes } from './routes';
import { initializeI18nService } from './services/i18n';

initializeI18nService();
initializeAuthModule({ authorizedPath: dashboardRoute.path() });

ReactDOM.render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <RoutingProvider routes={routes} wrapper={MainLayout} />
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
  document.querySelector('#root')
);
