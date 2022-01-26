import { Outlet, ReactLocation, Router, RouterProps } from 'react-location';
import { ReactLocationDevtools } from 'react-location-devtools';
import { parseSearch, stringifySearch } from 'react-location-jsurl';

const location = new ReactLocation({ parseSearch, stringifySearch });

type RoutingProviderProps = Omit<RouterProps, 'location' | 'children'>;

export const RoutingProvider = (props: RoutingProviderProps) => {
  return (
    <Router location={location} {...props}>
      <Outlet />
      <ReactLocationDevtools />
    </Router>
  );
};
