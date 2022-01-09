import type { Join, Split } from './string';
import type { Equal, Expect } from './tests';

export type JoinDescribe = {
  'Joins two values with the specified divider': [
    Expect<Equal<Join<'hello', 'world', ' '>, 'hello world'>>,
    Expect<Equal<Join<2, 3, '+'>, '2+3'>>
  ];
  'Uses dot as if no divider is specified': [
    Expect<Equal<Join<'hello', 'world'>, 'hello.world'>>,
    Expect<Equal<Join<2, 3>, '2.3'>>
  ];
  'Returns never if any of provided args is not a string or number': [
    Expect<Equal<Join<'hello', true>, never>>,
    Expect<Equal<Join<[], 3>, never>>
  ];
};

export type SplitDescribe = {
  'Splits values in place of a specified divider': [
    Expect<Equal<Split<'lorem ipsum dolor sit amet', ' '>, ['lorem', 'ipsum', 'dolor', 'sit', 'amet']>>,
    Expect<Equal<Split<'2+3', '+'>, ['2', '3']>>
  ];
  'Uses dot as if no divider is specified': [
    Expect<Equal<Split<'hello.world'>, ['hello', 'world']>>,
    Expect<Equal<Split<'2.3.4'>, ['2', '3', '4']>>
  ];
  'Returns an empty array if provided string is empty': [Expect<Equal<Split<''>, []>>];
  'Returns string array if provided string is not a constant': [Expect<Equal<Split<string>, string[]>>];
};
