import { get } from './object';
import { expectTypeOf } from './tests';

describe('get', () => {
  it('returns object value from the specified path when preserving its type', () => {
    const obj = { a: { b: 6 }, c: 3, d: [1, 'b', false] as const, e: true };

    expect(get(obj, ['a', 'b'])).toBe(6);
    expectTypeOf(get(obj, ['a', 'b'])).toBe<number>()();

    expect(get(obj, ['d', 1])).toBe('b');
    expectTypeOf(get(obj, ['d', 1])).toBe<'b'>()();

    expect(get(obj, ['e'])).toBe(true);
    expectTypeOf(get(obj, ['e'])).toBe<boolean>()();
  });
});
