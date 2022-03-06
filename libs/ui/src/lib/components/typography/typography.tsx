import { ElementType, forwardRef, ReactElement } from 'react';
import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import get from 'lodash/get';

import type { PolymorphicComponentPropsWithRef, PolymorphicRef } from '../../../types/polymorphic';
import type { StyledCallback } from '../../../types/styles';

type TypographySize = keyof Theme['typography'];
type TypographyWeight = keyof Theme['fontWeights'];
type TypographyFamily = keyof Theme['fontFamilies'];
type TypographyColor = 'title' | 'primary' | 'secondary' | 'brand' | 'error';

export interface TypographyBaseProps {
  size?: TypographySize;
  weight?: TypographyWeight;
  family?: TypographyFamily;
  color?: TypographyColor;
}

export type TypographyProps<As extends ElementType = 'div'> = PolymorphicComponentPropsWithRef<As, TypographyBaseProps>;

type TypographyComponent = <As extends ElementType = 'div'>(props: TypographyProps<As>) => ReactElement | null;

const colorsMap: Record<TypographyColor, string> = {
  title: 'gray.900',
  primary: 'gray.700',
  secondary: 'gray.500',
  error: 'error.500',
  brand: 'primary.500',
};

const colorStyles: StyledCallback<TypographyBaseProps> = ({ theme, color = 'primary' }) => ({
  color: get(theme.colors, colorsMap[color]),
});

const baseStyles: StyledCallback<TypographyBaseProps> = ({
  theme,
  size = 'md',
  weight = 'normal',
  family = 'body',
}) => ({
  ...theme.typography[size],
  fontWeight: theme.fontWeights[weight],
  fontFamily: theme.fontFamilies[family],
});

const StyledTypography = styled.div<TypographyBaseProps>(baseStyles, colorStyles);

export const Typography: TypographyComponent = forwardRef(
  <As extends ElementType = 'div'>(props: TypographyProps<As>, ref?: PolymorphicRef<As>) => (
    <StyledTypography {...props} ref={ref} />
  )
);
