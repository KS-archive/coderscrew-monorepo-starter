import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fromPairs, pickBy } from '@ccms/utils';

export const useQueryParams = <Search extends Record<string, string>>() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = useMemo(() => fromPairs([...searchParams.entries()]) as Search, [searchParams]);

  const updater = useCallback(
    (newValue: Partial<Search>) => {
      setSearchParams(Object.entries(pickBy({ ...value, ...newValue }, Boolean)));
    },
    [setSearchParams, value]
  );

  return [value, updater] as const;
};
