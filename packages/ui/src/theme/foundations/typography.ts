import { createStrictIdentity } from '@ccms/utils';

type TypographyVariant = {
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
};

const createVariant = createStrictIdentity<TypographyVariant>();

/* eslint-disable prettier/prettier */
export const typography = {
  xs:    createVariant({ fontSize: '0.75rem',  lineHeight: '1rem',    letterSpacing: '0em'      }),
  sm:    createVariant({ fontSize: '0.875rem', lineHeight: '1.25rem', letterSpacing: '-0.006em' }),
  md:    createVariant({ fontSize: '1rem',     lineHeight: '1.5rem',  letterSpacing: '-0.011em' }),
  lg:    createVariant({ fontSize: '1.125rem', lineHeight: '1.75rem', letterSpacing: '-0.014em' }),
  xl:    createVariant({ fontSize: '1.25rem',  lineHeight: '1.75rem', letterSpacing: '-0.017em' }),
  '2xl': createVariant({ fontSize: '1.5rem',   lineHeight: '2.5rem',  letterSpacing: '-0.019em' }),
  '3xl': createVariant({ fontSize: '1.875rem', lineHeight: '3rem',    letterSpacing: '-0.021em' }),
  '4xl': createVariant({ fontSize: '2.25rem',  lineHeight: '3rem',    letterSpacing: '-0.022em' }),
  '5xl': createVariant({ fontSize: '3rem',     lineHeight: '3rem',    letterSpacing: '-0.022em' }),
  '6xl': createVariant({ fontSize: '3.75rem',  lineHeight: '3.75rem', letterSpacing: '-0.022em' }),
  '7xl': createVariant({ fontSize: '4.5rem',   lineHeight: '4.5rem',  letterSpacing: '-0.022em' }),
  '8xl': createVariant({ fontSize: '6rem',     lineHeight: '6rem',    letterSpacing: '-0.022em' }),
} as const;
/* eslint-enable prettier/prettier */

export type TypographySize = keyof typeof typography;
