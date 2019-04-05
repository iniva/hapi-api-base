module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  globals: {},
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018
  },
  extends: ['airbnb-base'],
  plugins: ['import'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['Config', './src/config'],
          ['Plugins', './src/plugins'],
          ['Utils', './src/utils']
        ],
        extensions: ['.js']
      }
    }
  },
  rules: {
    // Customized Rules
    'arrow-parens': ['error', 'as-needed'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-param-reassign': ['error', { props: false }],

    // Plugin Rules
    'import/no-extraneous-dependencies': ['error', { packageDir: './' }],
    'import/no-commonjs': ['error', { allowRequire: true }],
    'import/order': [
      'warn',
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index']
        ],
        'newlines-between': 'always'
      }
    ]
  }
};
