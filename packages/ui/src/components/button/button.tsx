import { ComponentProps } from 'react';
import type { CSSObject } from '@emotion/styled';

import { styled, Theme } from '@/theme';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonColor = keyof Pick<Theme['colors'], 'gray' | 'red' | 'blue'>;
type ButtonVariant = 'solid' | 'outline' | 'ghost';

interface CustomProps {
  size?: ButtonSize;
  color?: ButtonColor;
  variant?: ButtonVariant;
}

const sizesMap = {
  xs: { padding: '0 8px', height: 24, typographyKey: 'xs', minWidth: 24 },
  sm: { padding: '0 12px', height: 32, typographyKey: 'sm', minWidth: 32 },
  md: { padding: '0 16px', height: 40, typographyKey: 'md', minWidth: 40 },
  lg: { padding: '0 20px', height: 48, typographyKey: 'lg', minWidth: 48 },
  xl: { padding: '0 24px', height: 56, typographyKey: 'lg', minWidth: 56 },
} as const;

type VariantFc = (props: { color: ButtonColor; theme: Theme }) => CSSObject;

const solidVariant: VariantFc = ({ theme, color }) =>
  color === 'gray'
    ? {
        background: theme.colors.gray[100],
        color: theme.colors.gray[800],
        '&:hover': { background: theme.colors.gray[200] },
        '&:active': { background: theme.colors.gray[300] },
      }
    : {
        background: theme.colors.gray[500],
        color: theme.colors.white,
        '&:hover': { background: theme.colors.gray[600] },
        '&:active': { background: theme.colors.gray[700] },
      };

const ghostVariant: VariantFc = ({ theme, color }) =>
  color === 'gray'
    ? {
        color: theme.colors.gray[800],
        '&:hover': { background: theme.colors.gray[100] },
        '&:active': { background: theme.colors.gray[200] },
      }
    : {
        color: theme.colors[color][600],
        background: theme.colors.transparent,
        '&:hover': { background: theme.colors[color][50] },
        '&:active': { background: theme.colors[color][100] },
      };

const outlineVariant: VariantFc = ({ theme, color }) => ({
  borderColor: color === 'gray' ? theme.colors.gray[200] : theme.colors.current,
  ...ghostVariant({ theme, color }),
});

const variantsMap: Record<ButtonVariant, VariantFc> = {
  solid: solidVariant,
  outline: outlineVariant,
  ghost: ghostVariant,
};

export const Button = styled.button<CustomProps>(
  ({ theme }) => ({
    width: 'fit-content',
    cursor: 'pointer',
    userSelect: 'none',
    textDecoration: 'none',
    boxSizing: 'border-box',
    fontWeight: theme.fontWeights.semibold,
    border: '1px solid transparent',
    borderRadius: 6,
    paddingY: 0,
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.225s ease-out',
    outline: 'none',

    '&:focus': {
      boxShadow: theme.shadows.outline,
    },

    '&:disabled': {
      opacity: 0.5,
      pointerEvents: 'none',
      cursor: 'not-allowed',
      boxShadow: 'none',
    },
  }),
  ({ theme, size = 'md' }) => {
    const { typographyKey, ...properties } = sizesMap[size];

    return { ...theme.typography[typographyKey], ...properties };
  },
  ({ theme, variant = 'solid', color = 'gray' }) => variantsMap[variant]({ theme, color })
);

export type ButtonProps = ComponentProps<typeof Button>;
