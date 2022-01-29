import { Navigate } from 'react-location';

import type { TypeSafePath } from '../routing.types';

interface RedirectProps {
  to: TypeSafePath;
  replace?: boolean;
}

export const Redirect = (props: RedirectProps) => <Navigate {...props} />;
