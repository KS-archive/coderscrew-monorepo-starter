import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@ccms/ui';

import { Auth } from '@/modules/auth';
import { Routing } from '@/services/routing';

import { dashboardRoute } from './pages/dashboard/dashboard.route';
import { routes } from './routes';
import { I18n } from './services/i18n';
import { Toasts } from './services/toasts';

Auth.initialize({ unauthorizedPath: dashboardRoute.path() });

ReactDOM.render(
  <StrictMode>
    <ThemeProvider>
      <I18n.Provider>
        <Toasts.Provider>
          <Routing.Provider routes={routes} />
        </Toasts.Provider>
      </I18n.Provider>
    </ThemeProvider>
  </StrictMode>,
  document.querySelector('#root')
);
