import { RouteObject, useRoutes } from 'react-router-dom';

interface RoutesListProps {
  routes: RouteObject[];
}

export const RoutesList = ({ routes }: RoutesListProps) => useRoutes(routes);
