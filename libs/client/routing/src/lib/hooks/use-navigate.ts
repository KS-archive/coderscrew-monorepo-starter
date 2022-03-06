import { useCallback } from 'react';
import { useNavigate as useRouterNavigate } from 'react-router-dom';

import type { RoutePath } from '../route-path';

interface Options {
  to: RoutePath;
  replace?: boolean;
}

export const useNavigate = () => {
  const navigate = useRouterNavigate();

  return useCallback(({ to, replace }: Options) => navigate(to.url, { replace }), [navigate]);
};
