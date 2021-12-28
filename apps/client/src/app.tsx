import './app.css';

import { useState } from 'react';

import { Button, styled } from '@ccms/ui';

import logo from './logo.svg';

const Hello = styled.div(({ theme }) => ({
  ...theme.typography['4xl'],
}));

export const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Hello>Hello Vite + React!</Hello>
        <p>
          <Button size="xl" color="gray" variant="solid" onClick={() => setCount((previous) => previous + 1)}>
            count is: {count}
          </Button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
};
