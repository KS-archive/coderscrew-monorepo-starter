// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Class<Type> = new (...args: any[]) => Type;

export type InferClass<Value> = Value extends Class<infer ClassType> ? ClassType : never;
