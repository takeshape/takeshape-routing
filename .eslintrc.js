module.exports =  {
  parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
  parserOptions:  {
    ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
    sourceType:  'module',  // Allows for the use of imports
  },
  plugins: [
    'jest',
    'filenames'
  ],
  extends:  [
    'xo',
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint',  // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended',  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    'padding-line-between-statements': 'off',
    'lines-between-class-members': 'off',
    'capitalized-comments': 'off',
    'no-multi-assign': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-function-return-type': ['warn', {allowHigherOrderFunctions: true, allowTypedFunctionExpressions: true}],
    '@typescript-eslint/no-unused-vars': 'error',
    'filenames/match-regex': [2, '^[a-z0-9\\-\\.]+$']
  },
  env: {
    'jest/globals': true,
    node: true
  }
};
