import { useParams as useRouterParams } from 'react-router-dom';

export const useParams = <Params extends Record<string, string>>() => useRouterParams<Params>();
