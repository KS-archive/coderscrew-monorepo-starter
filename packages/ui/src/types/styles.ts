import type { CSSObject } from '@emotion/react';

import type { Theme } from '@/theme';

export type StyledCallback<Props = Record<string, unknown>> = (props: Props & { theme: Theme }) => CSSObject;
