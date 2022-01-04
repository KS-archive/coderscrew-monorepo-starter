import type { CSSObject } from '@emotion/react';

import type { Theme } from '@/theme';

export type StyledCallback<Props> = (props: Props & { theme: Theme }) => CSSObject;
