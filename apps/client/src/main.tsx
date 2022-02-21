import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@ccms/ui';

import { initializeAuthModule } from '@/modules/auth';
import { RoutingProvider } from '@/services/routing';
import { ToastProvider } from '@/services/toasts';

import { MainLayout } from './layouts/main.layout';
import { dashboardRoute } from './pages/dashboard/dashboard.route';
import { Routes } from './routes';
import { initializeI18nService } from './services/i18n';

const renderApp = async () => {
  await initializeI18nService();
  initializeAuthModule({ authorizedPath: dashboardRoute.path() });

  ReactDOM.render(
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
    </StrictMode>,
    document.querySelector('#root')
  );
};

if (import.meta.env.VITE_MSW_SERVER === 'true') {
  import('@ccms/api/dist/worker')
    .then((module) => module.worker.start())
    .then(() => renderApp())
    .catch(console.error);
} else {
  renderApp().catch(console.error);
}
