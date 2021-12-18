module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'max-len': [
      'warn',
      {
        code: 100,
        ignoreComments: true,
        ignoreUrls: true,
      },
    ],
    'no-console': 'warn',
    'no-debugger': 'warn',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
        ],
      },
    },
  },
};
