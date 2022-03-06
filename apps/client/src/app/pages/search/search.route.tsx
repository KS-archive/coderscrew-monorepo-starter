import { defineRoute } from '@ccms/client/routing';

export type SearchRouteQueryParams = {
  param1?: string;
  param2?: string;
};

export const searchRoute = defineRoute({
  path: '/search',
  element: () => import('./search').then((module) => <module.Search />),
  createPath: (params?: SearchRouteQueryParams) => {
    const urlParamsString = new URLSearchParams(params).toString();

    return urlParamsString ? `/search?${urlParamsString}` : '/search';
  },
});
