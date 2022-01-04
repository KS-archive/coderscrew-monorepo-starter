import type { FunctionComponent, MouseEvent } from 'react';

import { styled, Theme } from '@/theme';
import type { StyledCallback } from '@/types';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonColor = keyof Pick<Theme['colors'], 'primary' | 'gray' | 'error' | 'warning' | 'success' | 'info'>;
type ButtonVariant = 'solid' | 'outline' | 'ghost';

export interface ButtonProps {
  size?: ButtonSize;
  color?: ButtonColor;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const sizesMap = {
  xs: { padding: '0 8px', height: 24, typographyKey: 'xs', minWidth: 24 },
  sm: { padding: '0 12px', height: 32, typographyKey: 'sm', minWidth: 32 },
  md: { padding: '0 16px', height: 40, typographyKey: 'md', minWidth: 40 },
  lg: { padding: '0 20px', height: 48, typographyKey: 'lg', minWidth: 48 },
  xl: { padding: '0 24px', height: 56, typographyKey: 'lg', minWidth: 56 },
} as const;

const sizeStyles: StyledCallback<ButtonProps> = ({ theme, size = 'md' }) => {
  const { typographyKey, ...properties } = sizesMap[size];

  return { ...theme.typography[typographyKey], ...properties };
};

type VariantFunction = StyledCallback<{ color: ButtonColor }>;

const solidVariant: VariantFunction = ({ theme, color }) =>
  color === 'gray'
    ? {
        background: theme.colors.gray[100],
        color: theme.colors.gray[800],
        '&:hover:enabled': { background: theme.colors.gray[200] },
        '&:active:enabled': { background: theme.colors.gray[300] },
      }
    : {
        background: theme.colors[color][500],
        color: theme.colors.white,
        '&:hover:enabled': { background: theme.colors[color][600] },
        '&:active:enabled': { background: theme.colors[color][700] },
      };

const ghostVariant: VariantFunction = ({ theme, color }) =>
  color === 'gray'
    ? {
        color: theme.colors.gray[800],
        '&:hover:enabled': { background: theme.colors.gray[100] },
        '&:active:enabled': { background: theme.colors.gray[200] },
      }
    : {
        color: theme.colors[color][600],
        background: theme.colors.transparent,
        '&:hover:enabled': { background: theme.colors[color][50] },
        '&:active:enabled': { background: theme.colors[color][100] },
      };

const outlineVariant: VariantFunction = ({ theme, color }) => ({
  borderColor: color === 'gray' ? theme.colors.gray[200] : theme.colors.current,
  ...ghostVariant({ theme, color }),
});

const variantsMap = { solid: solidVariant, outline: outlineVariant, ghost: ghostVariant };

const variantStyles: StyledCallback<ButtonProps> = ({ theme, variant = 'solid', color = 'gray' }) =>
  variantsMap[variant]({ theme, color });

const baseStyles: StyledCallback<ButtonProps> = ({ theme }) => ({
  width: 'fit-content',
  cursor: 'pointer',
  userSelect: 'none',
  textDecoration: 'none',
  boxSizing: 'border-box',
  fontWeight: theme.fontWeights.medium,
  border: '1px solid transparent',
  borderRadius: 6,
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.225s ease-out',
  outline: 'none',

  '&:focus:enabled': {
    boxShadow: theme.shadows.outline,
  },

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export const Button = styled.button<ButtonProps>(
  baseStyles,
  sizeStyles,
  variantStyles
) as FunctionComponent<ButtonProps>;
