type Equal<Type1, Type2> = (<Type>() => Type extends Type1 ? 1 : 2) extends <Type>() => Type extends Type2 ? 1 : 2
  ? true
  : false;

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

// @ts-expect-error - fc parameter is not used as we need it only to infer type.
export const expectReturnTypeOf = <Fc extends (...args: any[]) => any>(fc: Fc) => ({
  toBe<Type>(): Equal<ReturnType<Fc>, Type> extends true ? () => void : unknown {
    return () => {};
  },
});

// @ts-expect-error - value parameter is not used as we need it only to infer type.
export const expectTypeOf = <Value>(value: Value) => ({
  toBe<Type>(): Equal<Value, Type> extends true ? () => void : unknown {
    return () => {};
  },
});
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
