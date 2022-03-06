import * as ReactDOM from 'react-dom';

import { initializeAuthModule } from '@ccms/client/auth';
import { initializeI18nService } from '@ccms/client/i18n';

import { App } from './app/app';
import { dashboardRoute } from './app/pages/dashboard/dashboard.route';

const renderApp = async () => {
  await Promise.all([initializeI18nService(), initializeAuthModule({ authorizedPath: dashboardRoute.path() })]);

  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
