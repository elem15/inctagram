module.exports = {
    extends: "@it-incubator/stylelint-config",
    rules: {
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': [
            true,
            {
                'ignoreAtRules': [ 'tailwind' ]
            }
        ],
    },
    overrides: [
        {
          files: ["**/*.scss"],
          customSyntax: "postcss-scss"
        }
      ]
};
