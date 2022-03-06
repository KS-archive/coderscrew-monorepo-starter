// Source: https://www.benmvp.com/blog/typescript-user-defined-type-guards-rescue

import type { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, JSXElementConstructor } from 'react';

type EmptyObject = Record<string, never>;

type PropsOf<As extends keyof JSX.IntrinsicElements | JSXElementConstructor<unknown>> = JSX.LibraryManagedAttributes<
  As,
  ComponentPropsWithoutRef<As>
>;

type AsProp<As extends ElementType> = {
  as?: As;
};

type ExtendableProps<ExtendedProps = EmptyObject, OverrideProps = EmptyObject> = OverrideProps &
  Omit<ExtendedProps, keyof OverrideProps>;

type InheritableElementProps<As extends ElementType, Props = EmptyObject> = ExtendableProps<PropsOf<As>, Props>;

type PolymorphicComponentProps<As extends ElementType, Props = EmptyObject> = InheritableElementProps<
  As,
  Props & AsProp<As>
>;

export type PolymorphicRef<As extends ElementType> = ComponentPropsWithRef<As>['ref'];

export type PolymorphicComponentPropsWithRef<As extends ElementType, Props = EmptyObject> = PolymorphicComponentProps<
  As,
  Props
> & { ref?: PolymorphicRef<As> };
