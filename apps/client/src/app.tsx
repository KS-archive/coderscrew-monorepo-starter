import 'App.css';

import { Outlet, Router } from 'react-location';
import { ReactLocationDevtools } from 'react-location-devtools';

import { dashboardPaths, homePaths } from './pages/dashboard';
import { vitePaths } from './pages/vite';
import { Link } from './routing/link';
import { location, routes } from './routing/router';

export const App = () => {
  return (
    <Router routes={routes} location={location}>
      <div className="Nav">
        <Link to={homePaths}>Home</Link>

        <Link to={vitePaths.vite}>Vite</Link>

        <Link to={dashboardPaths}>Dashboard</Link>
      </div>
      <Outlet />
      <ReactLocationDevtools initialIsOpen={false} />
    </Router>
  );
};
