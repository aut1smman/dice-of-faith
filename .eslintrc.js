module.exports = {
  root: true,
  ignorePatterns: [
    'projects/**/*',
  ],
  overrides: [
    {
      files: [
        '*.ts',
      ],
      parserOptions: {
        'project': [
          'tsconfig.json',
          'e2e/tsconfig.json',
        ],
        'createDefaultProgram': true,
      },
      extends: [
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@angular-eslint/no-input-rename': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-empty-function': 1,
        '@angular-eslint/directive-selector': [
          'error',
          {
            'type': 'attribute',
            'prefix': 'app',
            'style': 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            'type': 'element',
            'prefix': 'app',
            'style': 'kebab-case',
          },
        ],
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
            singleQuote: true,
            trailingComma: 'all',
            printWidth: 120,
            tabWidth: 2,
            bracketSpacing: true,
            semi: true,
            parser: 'typescript',
            useTabs: false,
            arrowParens: 'avoid',
          },
        ],
      },
    },
    {
      files: [
        '*.html',
      ],
      extends: [
        'plugin:@angular-eslint/template/recommended',
      ],
      rules: {},
    },
  ],
};
