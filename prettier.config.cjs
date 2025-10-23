module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'always',
  printWidth: 80,
  endOfLine: 'lf',
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'angular',
      },
    },
  ],
};
