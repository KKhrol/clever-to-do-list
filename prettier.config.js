export default {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 80,
  arrowParens: 'avoid',
  endOfLine: 'auto',
  singleAttributePerLine: true,
  jsxBracketSameLine: false,
  bracketSameLine: false,
  bracketSpacing: true,

  proseWrap: 'preserve',

  importOrder: [
    '^@context/(.*)$',
    '^@config/(.*)$',
    '^@modules/(.*)$',
    '^types/(.*)$',
    '^@api/(.*)$',
    '^@components/(.*)$',
    '^@hooks/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
