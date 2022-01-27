import { ReactNode } from 'react';
import { Link as LocationLink } from 'react-location';

import { styled } from '@ccms/ui';

import { TypeSafePath } from './define-routes';

interface LinkProps {
  children: ReactNode;
  to: TypeSafePath;
  replace?: boolean;
}

const StyledLink = styled(LocationLink)(({ theme }) => ({
  color: theme.colors.primary[500],
  textDecoration: 'underline',
  cursor: 'pointer',

  '&:hover': { color: theme.colors.primary[600] },

  '&:active': { color: theme.colors.primary[700] },
}));

export const Link = (props: LinkProps) => <StyledLink {...props} />;
