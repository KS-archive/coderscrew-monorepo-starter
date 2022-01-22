import { createPath } from '@/routing/utils';

// export { Vite } from './vite.route';
// export { ViteId } from './vite-id.route';
export const viteModule = {
  path: 'vite' as const,
  children: [
    {
      path: '/',
      element: () => import('./vite.route').then((module) => <module.Vite />),
    },
    {
      path: ':id',
      element: () => import('./vite-id.route').then((module) => <module.ViteId />),
    },
  ],
};

export const vitePaths = {
  vite: createPath(viteModule.path),
  viteId: (id: number) => createPath(`${viteModule.path}/${id}`),
} as const;
