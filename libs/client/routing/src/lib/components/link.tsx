import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAsync } from 'react-use';

import { Link as UiLink, LinkProps as UiLinkProps } from '@ccms/ui';

import type { RoutePath } from '../route-path';

interface LinkProps extends Omit<UiLinkProps, 'href' | 'hrefLang' | 'as'> {
  children: ReactNode;
  to: RoutePath;
  replace?: boolean;
  preload?: boolean;
}

export const Link = ({ preload, to, ...props }: LinkProps) => {
  useAsync(async () => {
    if (preload) {
      await to.preload();
    }
  }, [preload, to.url]);

  return <UiLink as={RouterLink} to={to.url} {...props} />;
};
