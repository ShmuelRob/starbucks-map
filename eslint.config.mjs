import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            prettier: prettier,
        }, // Ensure the prettier plugin is loaded
        rules: {
            'no-unused-vars': [
                'error',
                { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
            ],
            // Enable prettier rules

            'prettier/prettier': [
                'error',
                {},
                {
                    // Optional: If you have a .prettierrc file, ESLint will automatically use it.
                    // You can specify Prettier options here as well.
                    usePrettierrc: true,
                },
            ],
        },
    },
];
