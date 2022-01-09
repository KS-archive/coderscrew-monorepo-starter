import type { Previous } from './number';
import type { Equal, Expect } from './tests';

export type PreviousDescribe = {
  'Returns an integer previous to the one provided up for arguments up to 21': [
    Expect<Equal<Previous<21>, 20>>,
    Expect<Equal<Previous<13>, 12>>,
    Expect<Equal<Previous<1>, 0>>
  ];
  'Returns never when there is no previous positive integer': [
    Expect<Equal<Previous<0>, never>>,
    Expect<Equal<Previous<-5>, never>>,
    Expect<Equal<Previous<5.5>, never>>
  ];
  'Returns never when provided argument is larger than the maximally allowed one (21)': [
    Expect<Equal<Previous<22>, never>>
  ];
};
