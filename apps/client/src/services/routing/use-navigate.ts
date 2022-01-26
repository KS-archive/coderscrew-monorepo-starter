import { useCallback } from 'react';
import { useNavigate as useNavigateLocation } from 'react-location';

import type { TypeSafePath } from './define-routes';

interface Options {
  to?: TypeSafePath;
  replace?: boolean;
}

export const useNavigate = () => {
  const navigate = useNavigateLocation();

  return useCallback((options: Options) => navigate(options), [navigate]);
};
