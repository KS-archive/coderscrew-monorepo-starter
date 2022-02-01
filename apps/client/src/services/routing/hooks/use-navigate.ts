import { useCallback } from 'react';
import { useNavigate as useNavigateLocation } from 'react-location';

import type { RoutePath } from '../route-path';

interface Options {
  to: RoutePath;
  replace?: boolean;
}

export const useNavigate = () => {
  const navigate = useNavigateLocation();

  return useCallback(({ to, ...options }: Options) => navigate({ ...options, to: to.url }), [navigate]);
};
