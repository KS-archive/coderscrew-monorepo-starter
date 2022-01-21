/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  overrides: [
    {
      files: 'src/generated/schema.ts',
      rules: {
        '@typescript-eslint/naming-convention': 0,
        '@typescript-eslint/ban-types': 0,
        '@typescript-eslint/no-empty-interface': 0,
      },
    },
    {
      files: 'src/**/*.spec.ts',
      rules: {
        // We use conditionals to narrow types.
        'jest/no-conditional-expect': 0,
      },
    },
  ],
};
