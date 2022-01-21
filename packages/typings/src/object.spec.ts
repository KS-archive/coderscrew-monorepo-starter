import { Values } from '.';
import type { LeavesArray, LeavesString } from './object';
import type { Equal, Expect } from './tests';

type Obj = {
  a: string;
  b: {
    b1: {
      100: number;
    };
    b2: boolean;
  };
};

export type LeavesStringDescribe = {
  'Lists all paths to end properties of the object in a form of dotted string': [
    Expect<Equal<LeavesString<Obj>, 'a' | 'b.b1.100' | 'b.b2'>>
  ];
};

export type LeavesArrayDescribe = {
  'Lists all paths to end properties of the object in a form of array': [
    Expect<Equal<LeavesArray<Obj>, ['a'] | ['b', 'b1', 100] | ['b', 'b2']>>
  ];
};

export type ValuesDescribe = {
  'Returns an union of object values': [Expect<Equal<Values<Obj>, Obj['a'] | Obj['b']>>];
};
