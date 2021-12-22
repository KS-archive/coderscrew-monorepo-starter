/**
 * @type {import('eslint').Linter.ConfigOverride}
 */
module.exports = {
  files: ['*.tsx'],
  rules: {
    // We see no reason to prevent props spreading in react components.
    'react/jsx-props-no-spreading': 0,

    // To be consistent we want to always use arrow function when creating components.
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
  },
};
