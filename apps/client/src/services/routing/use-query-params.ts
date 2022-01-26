import { useCallback } from 'react';
import { MakeGenerics, Updater, useNavigate, useSearch } from 'react-location';

import { pickBy } from '@ccms/utils';

export const useQueryParams = <Search extends Record<string, string>>() => {
  const value = useSearch<MakeGenerics<{ Search: Search }>>();
  const navigate = useNavigate<MakeGenerics<{ Search: Search }>>();

  const updater = useCallback(
    (search: Updater<typeof value>) => {
      navigate({
        replace: true,
        search: (prev) => pickBy(typeof search === 'function' ? search(prev) : search, Boolean),
      });
    },
    [navigate]
  );

  return [value, updater] as const;
};
