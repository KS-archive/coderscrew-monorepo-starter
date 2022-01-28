import { ElementType, forwardRef, ReactElement } from 'react';

import type { PolymorphicComponentPropsWithRef, PolymorphicRef } from '@/types';
import { styled } from '@/utils';

import { Typography, TypographyBaseProps } from '../typography/typography';

export type LinkBaseProps = Omit<TypographyBaseProps, 'color'>;

export type LinkProps<As extends ElementType = 'a'> = PolymorphicComponentPropsWithRef<As, LinkBaseProps>;

type LinkComponent = <As extends ElementType = 'a'>(props: LinkProps<As>) => ReactElement | null;

const StyledLink = styled(Typography)<LinkBaseProps>(({ theme }) => ({
  cursor: 'pointer',
  textDecoration: 'underline',
  color: theme.colors.primary[500],

  '&:hover': { color: theme.colors.primary[600] },

  '&:active': { color: theme.colors.primary[700] },
}));

export const Link: LinkComponent = forwardRef(
  <As extends ElementType = 'a'>({ as, ...props }: LinkProps<As>, ref?: PolymorphicRef<As>) => (
    <StyledLink as={as ?? 'a'} {...props} ref={ref} />
  )
);
