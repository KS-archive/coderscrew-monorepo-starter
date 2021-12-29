import { expectTypeOf } from '.';
import { isBoolean } from './lang';

const getStringNumberOrBoolean = () => {
  const values = [true, 'hello', 1];

  return values[Math.floor(Math.random() * values.length)];
};

describe('isBoolean', () => {
  it('returns `true` for booleans', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });

  it('returns `false` for non-booleans', () => {
    expect(isBoolean([1, 2, 3])).toBe(false);
    expect(isBoolean(new Date())).toBe(false);
    expect(isBoolean(new Error('a'))).toBe(false);
    expect(isBoolean({ a: 1 })).toBe(false);
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean(/x/)).toBe(false);
    expect(isBoolean('a')).toBe(false);
    expect(isBoolean(Symbol('a'))).toBe(false);
  });

  it('casts checked value to a boolean type', () => {
    const value = getStringNumberOrBoolean();

    if (isBoolean(value)) {
      expectTypeOf(value).toBe<boolean>()();
    } else {
      expectTypeOf(value).toBe<string | number>()();
    }
  });
});
