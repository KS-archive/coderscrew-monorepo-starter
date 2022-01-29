import './index.css';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@ccms/ui';

import { Auth } from '@/modules/auth';
import { RoutingProvider } from '@/services/routing';

import { dashboardRoute } from './pages/dashboard/dashboard.route';
import { routes } from './routes';

ReactDOM.render(
  <StrictMode>
    <ThemeProvider>
      <Auth.Provider unauthorizedPath={dashboardRoute.path()}>
        <RoutingProvider routes={routes} />
      </Auth.Provider>
    </ThemeProvider>
  </StrictMode>,
  document.querySelector('#root')
);
