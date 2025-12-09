//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config';
import react from 'eslint-plugin-react';

export default [
  ...tanstackConfig,
  {
    // React specific rules
    plugins: { react },
    settings: { react: { version: 'detect' } },
    rules: {
      'react/button-has-type': 'error',
      'react/jsx-boolean-value': 'error',
      'react/jsx-curly-brace-presence': ['error', 'never'],
      'react/jsx-fragments': ['error', 'syntax'],
      'react/jsx-no-comment-textnodes': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/no-children-prop': 'error',
      'react/no-deprecated': 'error',
      'react/no-find-dom-node': 'error',
      'react/no-string-refs': 'error',
      'react/self-closing-comp': 'error',
      'react/void-dom-elements-no-children': 'error',
    },
  },
  {
    ignores: [
      '.ai',
      '.nitro',
      '.output',
      '.tanstack',
      'dist',
      'node_modules',
      'eslint.config.js',
      'prettier.config.js',
    ],
  },
];
