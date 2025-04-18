export default {
  '*.{js,jsx,ts,tsx}': ['eslint --fix --max-warnings=0', 'prettier --write'],
  '*.{css,scss}': ['stylelint --fix'],
  '*.{json,md,yml,yaml}': ['prettier --write'],
};
