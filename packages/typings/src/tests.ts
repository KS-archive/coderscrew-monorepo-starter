/* eslint-disable @typescript-eslint/naming-convention */

export type Expect<T extends true> = T;

export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

/* eslint-enable @typescript-eslint/naming-convention */
