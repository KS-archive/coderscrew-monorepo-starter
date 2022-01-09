type PreviousArray = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...never[]];

type IsPositiveInteger<Value extends number> = `${Value}` extends `-${string}` | `${string}.${string}` ? false : true;

export type Previous<Num extends number> = IsPositiveInteger<Num> extends true ? PreviousArray[Num] : never;
