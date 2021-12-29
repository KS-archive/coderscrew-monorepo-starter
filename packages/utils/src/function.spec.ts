import { createIdentityFunction } from './function';
import { expectReturnTypeOf } from './tests';

describe('createIdentityFunction', () => {
  it('creates function that returns the first argument given', () => {
    const identity = createIdentityFunction();

    expect(identity({ a: 1 })).toStrictEqual({ a: 1 });
    expect(identity(1)).toStrictEqual(1);
    expect(identity(true)).toStrictEqual(true);
  });

  it('creates function that accepts type of argument specified in generic', () => {
    const unknownIdentity = createIdentityFunction();
    const numberIdentity = createIdentityFunction<number>();
    const recordIdentity = createIdentityFunction<Record<string, boolean>>();

    expectReturnTypeOf(unknownIdentity).toBe<unknown>()();
    expectReturnTypeOf(numberIdentity).toBe<number>()();
    expectReturnTypeOf(recordIdentity).toBe<Record<string, boolean>>()();
  });
});
