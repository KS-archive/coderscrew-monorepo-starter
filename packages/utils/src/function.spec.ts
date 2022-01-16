import { createExtendableIdentity, createStrictIdentity } from './function';
import { expectFunction, expectTypeOf } from './tests';

describe('createStrictIdentity', () => {
  it('creates function that returns the first argument given', () => {
    const identity = createStrictIdentity();

    expect(identity({ a: 1 })).toStrictEqual({ a: 1 });
    expect(identity(1)).toBe(1);
    expect(identity(true)).toBe(true);
  });

  it('creates function which returns type specified in the generic', () => {
    const unknownIdentity = createStrictIdentity();
    const numberIdentity = createStrictIdentity<number>();
    const recordIdentity = createStrictIdentity<{ a: string }>();

    expectFunction(unknownIdentity).toReturnValueOfType<unknown>()();
    expectFunction(numberIdentity).toReturnValueOfType<number>()();
    expectFunction(recordIdentity).toReturnValueOfType<{ a: string }>()();
  });

  // TODO: Implement expectFunction.toAcceptArgument
  // eslint-disable-next-line jest/expect-expect
  it('creates function which accepts only argument of type that equals the specified generic', () => {
    const recordIdentity = createStrictIdentity<{ a: string }>();

    // correct usage - strict match
    recordIdentity({ a: 'hello' });

    // @ts-expect-error property type mismatch
    recordIdentity({ a: 3 });

    // @ts-expect-error no strict match
    recordIdentity({ a: 'hello', b: 2 });
  });
});

describe('createExtendableIdentity', () => {
  it('creates function that returns the first argument given', () => {
    const identity = createExtendableIdentity();

    expect(identity({ a: 1 })).toStrictEqual({ a: 1 });
    expect(identity(1)).toBe(1);
    expect(identity(true)).toBe(true);
  });

  it('creates function which returns type that extends one specified in the generic', () => {
    const unknownIdentity = createExtendableIdentity();
    const recordIdentity = createExtendableIdentity<{ a: string }>();

    expectFunction(unknownIdentity).toReturnValueOfType<unknown>()();
    expectTypeOf(recordIdentity({ a: 'hello' })).toBe<{ a: string }>()();
    expectTypeOf(recordIdentity({ a: 'hello', b: 1 })).toBe<{ a: string; b: number }>()();
  });

  // eslint-disable-next-line jest/expect-expect
  it('creates function which accepts only argument of type that extends the specified generic', () => {
    const recordIdentity = createExtendableIdentity<{ a: string }>();

    // correct usage - strict match
    recordIdentity({ a: 'hello' });

    // correct usage - object extends the generic type
    recordIdentity({ a: 'hello', b: 2 });

    // @ts-expect-error property type mismatch
    recordIdentity({ a: true });
  });
});
