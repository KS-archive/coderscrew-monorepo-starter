import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@ccms/ui';

import { Auth } from '@/modules/auth';
import { RoutingProvider } from '@/services/routing';

import { dashboardRoute } from './pages/dashboard/dashboard.route';
import { routes } from './routes';
import { Toasts } from './services/toasts';

Auth.initialize({ unauthorizedPath: dashboardRoute.path() });

ReactDOM.render(
  <StrictMode>
    <ThemeProvider>
      <Toasts.Provider>
        <RoutingProvider routes={routes} />
      </Toasts.Provider>
    </ThemeProvider>
  </StrictMode>,
  document.querySelector('#root')
);
