import type { ReactNode } from 'react';
import { Link as LocationLink } from 'react-location';

import { Link as UiLink, LinkProps as UiLinkProps } from '@ccms/ui';

import type { TypeSafePath } from '../routing.types';

interface LinkProps extends Omit<UiLinkProps, 'href' | 'hrefLang'> {
  children: ReactNode;
  to: TypeSafePath;
  replace?: boolean;
}

export const Link = (props: LinkProps) => <UiLink as={LocationLink} {...props} />;
