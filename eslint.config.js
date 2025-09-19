
import globals from 'globals';
import { eslintConfig, eslintConfigReact } from '@goncharovv/eslint-config';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...eslintConfig,
  ...eslintConfigReact,

  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },

  {
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@stylistic/quote-props': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  { ignores: ['ios', 'android', 'src/shared/api'] },
];
