module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint-config-prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    'globalThis': false,
    'NodeJS': true,
    'JSX': true,
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  plugins: ['react-refresh', '@typescript-eslint', 'import'],
  settings: {
    'react': {
      'version': 'detect'
    },
    'import/core-modules': [
      '@emotion/react',
      '@emotion/styled',
    ],
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      'node': {
        'paths': ['public'],
        'extensions': ['.js', '.jsx', '.ts', '.tsx']
      },
      'typescript': {
        'project': '.'
      }
    }
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'arrow-body-style': 'off',
    'no-plusplus': 'off',
    'react/display-name': 'off',
    'react/function-component-definition': ['warn', { 'namedComponents': 'arrow-function' }],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-filename-extension': ['error', { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/no-absolute-path': 'off',
    'no-restricted-exports': ['error', { 'restrictDefaultExports': { 'defaultFrom': false } }],
    'import/order': [
      'warn',
      {
        'pathGroups': [
          {
            'pattern': '@/lib/**',
            'group': 'external'
          },
          {
            'pattern': '{types/*,@/types*,./types}',
            'group': 'type'
          },
          {
            'pattern': '{hooks,@/hooks/**/*,./hooks/**,./use**,../use**,../../use**,../../../use**,,../../hooks/**,./_hooks/**,../../../_hooks/**}',
            'group': 'internal'
          },
          {
            'pattern': '{utils/**/*,./utils,../utils,../../utils,../../../utils}',
            'group': 'type'
          },
          {
            'pattern': '{@/constants/*,./constants}',
            'group': 'type'
          },
          {
            'pattern': '{states/**/*,./states*,./**/states*,../states*,../../states*,../../../states*,,../../../../states*,**/**/**/states*}',
            'group': 'type'
          },
          {
            'pattern': '@/services/**',
            'group': 'type'
          },
          {
            'pattern': '{./helpers,./data,./config,./defaults,../../../defaults}',
            'group': 'type'
          },
          {
            'pattern': '{components,components/_common/**,@/components,@/components/**,svgs,@/assets/**/*,@/app/**,routes/**,public/**}',
            'group': 'index'
          },
          {
            'pattern': '{styles,./*.scss,../*.scss,../*.module.scss}',
            'group': 'index'
          }
        ],
        'groups': [
          ['external', 'builtin'],
          ['type', 'internal', 'object'],
          ['parent', 'sibling', 'index']
        ],
        'newlines-between': 'always'
      }
    ],
    'import/no-anonymous-default-export': 'off',
    'import/no-extraneous-dependencies': 0,
    'import/extensions': [
      'error',
      'never'
    ],
    'no-param-reassign': ['error', { 'props': false }],
    'no-unused-expressions': ['warn'],
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'no-console':'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
    'prefer-destructuring': ['error', { 'object': true, 'array': false }],
    'lines-between-class-members': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        'labelComponents': ['label'],
        'labelAttributes': ['htmlFor'],
        'controlComponents': ['input']
      }
    ]
  },
}
