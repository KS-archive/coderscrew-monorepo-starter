// Assertions exported from the utils workspace.
const utilsAssertions = ['expectFunction', 'expectTypeOf'];

// Assertions used in server e2e tests.
const supertestAssertions = ['request.**.expect'];

/**
 * @type {import('eslint').Linter.ConfigOverride}
 */
module.exports = {
  files: ['*.spec.ts?(x)'],
  env: { jest: true, node: true },
  extends: [
    'plugin:jest/recommended',
    'plugin:jest-dom/recommended',
    'plugin:testing-library/react',
    'plugin:jest-formatting/recommended',
  ],
  rules: {
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'jest/expect-expect': [2, { assertFunctionNames: ['expect', ...utilsAssertions, ...supertestAssertions] }],
  },
};
