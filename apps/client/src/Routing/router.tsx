import { MakeGenerics, ReactLocation, useNavigate as useNavigateLocation, UseNavigateType } from 'react-location';

import { dashboardModule, homeModule } from '@/pages/dashboard/';
import { viteModule } from '@/pages/vite';

import { Path } from './utils';

const routes = [homeModule, viteModule, dashboardModule];

export const useNavigate = () => {
  const navigate = useNavigateLocation();

  return (navigateOptions: UseNavigateType & { to: Path }) => navigate(navigateOptions);
};

export type LocationGenerics = MakeGenerics<object>;
const location = new ReactLocation();
export { location, routes };
