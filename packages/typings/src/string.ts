export type Join<Left, Right, Divider extends string = '.'> = Left extends string | number
  ? Right extends string | number
    ? `${Left}${'' extends Right ? '' : Divider}${Right}`
    : never
  : never;

export type Split<Str extends string, Divider extends string = '.'> = string extends Str
  ? string[]
  : Str extends ''
  ? []
  : Str extends `${infer Left}${Divider}${infer Right}`
  ? [Left, ...Split<Right, Divider>]
  : [Str];
