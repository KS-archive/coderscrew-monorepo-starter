import './index.css';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@ccms/ui';

import { RoutingProvider } from '@/services/routing';

import { routes } from './routes';

ReactDOM.render(
  <StrictMode>
    <ThemeProvider>
      <RoutingProvider routes={routes} />
    </ThemeProvider>
  </StrictMode>,
  document.querySelector('#root')
);
