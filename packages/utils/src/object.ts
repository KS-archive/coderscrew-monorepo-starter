import lodashPickBy from 'lodash/pickBy';

import type { Values } from '@ccms/typings';

export { default as get } from 'lodash/get';
export { default as pick } from 'lodash/pick';

export const pickBy = lodashPickBy as <Obj extends Record<string, unknown>>(
  obj: Obj,
  predicate: (value: Values<Obj>, index: number) => boolean
) => Partial<Obj>;
