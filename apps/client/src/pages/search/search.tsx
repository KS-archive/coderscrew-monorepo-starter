import { useQueryParams } from '@/services/routing';

import type { SearchRouteQueryParams } from './search.route';

export const Search = () => {
  const [queryParams, setQueryParams] = useQueryParams<SearchRouteQueryParams>();

  return (
    <div>
      <div>Params values</div>
      <div>Param 1: {queryParams.param1}</div>
      <div>Param 2: {queryParams.param2}</div>
      <input
        style={{ border: '1px solid gray' }}
        value={queryParams.param1 ?? ''}
        onChange={(event) => setQueryParams((prev) => ({ ...prev, param1: event.target.value }))}
        placeholder="Param 1 value"
      />
      <input
        style={{ border: '1px solid gray' }}
        value={queryParams.param2 ?? ''}
        onChange={(event) => setQueryParams((prev) => ({ ...prev, param2: event.target.value }))}
        placeholder="Param 2 value"
      />
    </div>
  );
};
