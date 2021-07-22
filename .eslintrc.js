module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb',
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'consistent-return': 'off',
  },
};
