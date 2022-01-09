import type { FunctionComponent } from 'react';

import { get } from '@ccms/utils';

import type { ColorKeyPath, Theme } from '@/theme';
import type { StyledCallback } from '@/types';
import { styled } from '@/utils';

type TypographySize = keyof Theme['typography'];
type TypographyWeight = keyof Theme['fontWeights'];
type TypographyFamily = keyof Theme['fontFamilies'];
type TypographyColor = 'title' | 'primary' | 'secondary' | 'brand' | 'error';
type TypographyAs = 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface TypographyProps {
  size?: TypographySize;
  weight?: TypographyWeight;
  family?: TypographyFamily;
  color?: TypographyColor;
  className?: string;
  as?: TypographyAs;
}

const createColorsMap = <Colors extends Record<TypographyColor, ColorKeyPath>>(colors: Colors) => colors;
const colorsMap = createColorsMap({
  title: ['gray', 900],
  primary: ['gray', 700],
  secondary: ['gray', 500],
  error: ['error', 500],
  brand: ['primary', 500],
});

const colorStyles: StyledCallback<TypographyProps> = ({ theme, color = 'primary' }) => ({
  color: get(theme.colors, colorsMap[color]),
});

const baseStyles: StyledCallback<TypographyProps> = ({ theme, size = 'md', weight = 'normal', family = 'body' }) => ({
  ...theme.typography[size],
  fontWeight: theme.fontWeights[weight],
  fontFamily: theme.fontFamilies[family],
});

export const Typography = styled.div<TypographyProps>(baseStyles, colorStyles) as FunctionComponent<TypographyProps>;
