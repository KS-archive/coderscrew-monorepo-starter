import type { ComponentType, ReactNode } from 'react';
import { Outlet, ReactLocation, Router, RouterProps } from 'react-location';
import { ReactLocationDevtools } from 'react-location-devtools';
import { parseSearch, stringifySearch } from 'react-location-jsurl';

const location = new ReactLocation({ parseSearch, stringifySearch });

interface RoutingProviderProps extends Omit<RouterProps, 'location' | 'children'> {
  wrapper: ComponentType<{ children: ReactNode }>;
}

export const RoutingProvider = ({ wrapper: Wrapper, ...props }: RoutingProviderProps) => {
  return (
    <Router location={location} {...props}>
      <Wrapper>
        <Outlet />
      </Wrapper>
      <ReactLocationDevtools />
    </Router>
  );
};
