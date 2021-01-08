module.exports = {
  // watch this for explaining why some of this is here
  parser: 'babel-eslint',
  env: {
    mocha: true
  },
  extends: 'airbnb-base',
  rules: {
    'no-underscore-dangle': 'off',
    'comma-dangle': 'off',
    'linebreak-style': ['error', 'windows'],
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    'arrow-body-style': ['error', 'always'],
    'consistent-return': 'off',
    'max-len': ['error', { code: 150 }],
    'no-console': 'off'
  }
};
