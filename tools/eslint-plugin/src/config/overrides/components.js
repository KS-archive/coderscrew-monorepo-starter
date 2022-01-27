/**
 * @type {import('eslint').Linter.ConfigOverride}
 */
module.exports = {
  files: ['*.tsx'],
  rules: {
    // We see no reason to prevent props spreading in react components.
    'react/jsx-props-no-spreading': 0,

    // To be consistent we want to always use arrow function when creating components.
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
    ],

    // No need for prop-types as we have TypeScript types.
    'react/prop-types': 0,

    // In case of many props `undefined` is a correct value.
    'react/require-default-props': 0,
  },
};
