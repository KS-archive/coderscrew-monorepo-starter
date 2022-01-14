import './index.css';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@ccms/ui';

import { App } from './app';

ReactDOM.render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.querySelector('#root')
);
