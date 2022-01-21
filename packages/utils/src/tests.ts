import type { Equal } from '@ccms/typings';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

// @ts-expect-error - value parameter is not used as we need it only to infer type.
export const expectTypeOf = <Value>(value: Value) => ({
  toBe<Type>(): Equal<Value, Type> extends true ? () => void : unknown {
    return () => {};
  },
});

// @ts-expect-error - value parameter is not used as we need it only to infer type.
export const expectFunction = <Fc extends (...args: any[]) => any>(fc: Fc) => ({
  toReturnValueOfType<Type>(): Equal<ReturnType<Fc>, Type> extends true ? () => void : unknown {
    return () => {};
  },
});
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
