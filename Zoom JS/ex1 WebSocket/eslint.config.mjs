import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    ...pluginJs.configs.recommended, // Spread the recommended configuration
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Set no-unused-vars to warning level
      'no-unused-vars': 'warn',
    },
  },
];
