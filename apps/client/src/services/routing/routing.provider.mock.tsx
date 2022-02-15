import { createMemoryHistory, Outlet, ReactLocation, Router, RouterProps } from 'react-location';
import { parseSearch, stringifySearch } from 'react-location-jsurl';

const history = createMemoryHistory();
const location = new ReactLocation({ parseSearch, stringifySearch, history });

type RoutingProviderMockProps = Omit<RouterProps, 'location'>;

export const RoutingProviderMock = ({ children, ...props }: RoutingProviderMockProps) => (
  <Router location={location} {...props}>
    {children}
    <Outlet />
  </Router>
);
