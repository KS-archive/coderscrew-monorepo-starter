import { ReactNode, useEffect } from 'react';
import { Link as LocationLink } from 'react-location';

import { Link as UiLink, LinkProps as UiLinkProps } from '@ccms/ui';

import type { RoutePath } from '../route-path';

interface LinkProps extends Omit<UiLinkProps, 'href' | 'hrefLang' | 'as'> {
  children: ReactNode;
  to: RoutePath;
  replace?: boolean;
  preload?: boolean;
}

export const Link = ({ preload, to, ...props }: LinkProps) => {
  useEffect(() => {
    if (preload) {
      to.preload().catch(console.error);
    }
  }, [preload, to]);

  return <UiLink as={LocationLink} to={to.url} {...props} />;
};
