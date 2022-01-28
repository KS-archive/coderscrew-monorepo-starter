// Source: https://www.benmvp.com/blog/typescript-user-defined-type-guards-rescue

import type { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, JSXElementConstructor } from 'react';

type EmptyObject = Record<string, never>;

/**
 * A more precise version of just React.ComponentPropsWithoutRef on its own.
 */
export type PropsOf<As extends keyof JSX.IntrinsicElements | JSXElementConstructor<unknown>> =
  JSX.LibraryManagedAttributes<As, ComponentPropsWithoutRef<As>>;

type AsProp<As extends ElementType> = {
  /**
   * An override of the default HTML tag.
   * Can also be another React component.
   */
  as?: As;
};

/**
 * Allows for extending a set of props (`ExtendedProps`) by an overriding set of props
 * (`OverrideProps`), ensuring that any duplicates are overridden by the overriding
 * set of props.
 */
export type ExtendableProps<ExtendedProps = EmptyObject, OverrideProps = EmptyObject> = OverrideProps &
  Omit<ExtendedProps, keyof OverrideProps>;

/**
 * Allows for inheriting the props from the specified element type so that
 * props like children, className & style work, as well as element-specific
 * attributes like aria roles. The component (`As`) must be passed in.
 */
export type InheritableElementProps<As extends ElementType, Props = EmptyObject> = ExtendableProps<PropsOf<As>, Props>;

/**
 * A more sophisticated version of `InheritableElementProps` where
 * the passed in `as` prop will determine which props can be included
 */
export type PolymorphicComponentProps<As extends ElementType, Props = EmptyObject> = InheritableElementProps<
  As,
  Props & AsProp<As>
>;

/**
 * Utility type to extract the `ref` prop from a polymorphic component
 */
export type PolymorphicRef<As extends ElementType> = ComponentPropsWithRef<As>['ref'];

/**
 * A wrapper of `PolymorphicComponentProps` that also includes the `ref`
 * prop for the polymorphic component
 */
export type PolymorphicComponentPropsWithRef<As extends ElementType, Props = EmptyObject> = PolymorphicComponentProps<
  As,
  Props
> & { ref?: PolymorphicRef<As> };
