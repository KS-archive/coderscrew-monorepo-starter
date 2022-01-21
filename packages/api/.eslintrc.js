/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  overrides: [
    {
      files: 'schema.ts',
      rules: {
        '@typescript-eslint/naming-convention': 0,
        '@typescript-eslint/ban-types': 0,
        '@typescript-eslint/no-empty-interface': 0,
      },
    },
    {
      files: '*.spec.ts',
      rules: {
        // We use conditionals to narrow types (isOk, isErr).
        'jest/no-conditional-expect': 0,

        // We have a custom function to generate describe title.
        'jest/valid-title': [2, { ignoreTypeOfDescribeName: true }],
      },
    },
    {
      files: '*.responses.ts',
      rules: {
        // Responses files groups many classes for responses of similar type.
        'max-classes-per-file': 0,
      },
    },
  ],
};
