import { MakeGenerics, useMatch } from 'react-location';

export const useParams = <Params extends Record<string, string>>() =>
  useMatch<MakeGenerics<{ Params: Params }>>().params;
