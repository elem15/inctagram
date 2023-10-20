module.exports = {
  extends: ['next/core-web-vitals', '@it-incubator/eslint-config', 'plugin:storybook/recommended'],
  rules: { 'no-console': ['warn', { allow: ['warn', 'error'] }] },
}
