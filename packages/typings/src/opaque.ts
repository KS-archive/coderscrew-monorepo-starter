declare const baseSymbol: unique symbol;
declare const brandSymbol: unique symbol;

interface Brand<BaseType, BrandType = unknown> {
  readonly [baseSymbol]: BaseType;
  readonly [brandSymbol]: BrandType;
}

type Opaque<BaseType, BrandType = unknown> = BaseType & Brand<BaseType, BrandType>;

export const opaque = <BaseType, BrandType = unknown>() => ({
  create: (value: BaseType) => value as Opaque<BaseType, BrandType>,
  widen: (value: Opaque<BaseType, BrandType>): BaseType => value,
});
