import type { Previous } from './number';
import type { Join } from './string';

export type LeavesString<Obj, MaxDepth extends number = 10> = [MaxDepth] extends [never]
  ? never
  : Obj extends object
  ? { [K in keyof Obj]-?: Join<K, LeavesString<Obj[K], Previous<MaxDepth>>> }[keyof Obj]
  : '';

export type LeavesArray<Obj, MaxDepth extends number = 10> = [MaxDepth] extends [never]
  ? never
  : Obj extends object
  ? { [K in keyof Obj]-?: [K, ...LeavesArray<Obj[K], Previous<MaxDepth>>] }[keyof Obj]
  : [];
