'use strict';

module.exports = {
  root: true,

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jsx-a11y/strict',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/all',
    'plugin:jest-dom/recommended',
  ],

  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    warnOnUnsupportedTypeScriptVersion: true,
  },

  rules: {
    // react
    'react/prop-types': 'off',

    // @typescript-eslint
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // jsx-a11y
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/label-has-associated-control': 'error',

    // import
    'import/no-unresolved': 'off',

    // react hooks
    'react-hooks/exhaustive-deps': [
      'error',
      {
        additionalHooks: '(useEnhancedEffect)',
      },
    ],

    // jest
    'jest/consistent-test-it': [
      'error',
      {
        withinDescribe: 'test',
        fn: 'test',
      },
    ],
    'jest/prefer-expect-assertions': 'off',
    'jest/expect-expect': [
      'error',
      {
        assertFunctionNames: ['expect', 'getBy*'],
      },
    ],
  },
};
