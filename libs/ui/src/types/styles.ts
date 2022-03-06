import type { CSSObject, Theme } from '@emotion/react';

export type StyledCallback<Props = Record<string, unknown>> = (props: Props & { theme: Theme }) => CSSObject;
