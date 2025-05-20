import pluginNext from '@next/eslint-plugin-next';
import parser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import perfectionist from 'eslint-plugin-perfectionist';
import pluginPromise from 'eslint-plugin-promise';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    // add plugins here when using predefined configs (the extends)
    tseslint.configs.recommended,
    pluginPromise.configs['flat/recommended'],
    jsxA11y.flatConfigs.recommended,
    eslintConfigPrettier,
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: {
            parser,
            parserOptions: {
                ecmaFeatures: { jsx: true },
                ecmaVersion: 'latest',
                projectService: true,
                sourceType: 'module',
                tsconfigRootDir: import.meta.dirname
            }
        },
        name: 'ESLint Config - nextjs',
        plugins: {
            // add plugins here when skipping predefined configs...
            '@next/next': pluginNext,
            perfectionist
        },
        rules: {
            // then add their rules here
            ...pluginNext.configs.recommended.rules,
            ...pluginNext.configs['core-web-vitals'].rules,
            '@typescript-eslint/ban-ts-comment': 'warn',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-empty-object-type': 'warn',
            '@typescript-eslint/no-unused-expressions': 'warn',
            '@typescript-eslint/no-unused-vars': [
                // allow unused vars and args that start with an underscore e.g. `_myVar`
                'warn',
                {
                    vars: 'all',
                    args: 'after-used',
                    ignoreRestSiblings: false,
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^(_|ignore)'
                }
            ],
            'arrow-parens': [1, 'as-needed'],
            'comma-dangle': 1,
            indent: ['warn', 4],
            'no-console': 'warn',
            'object-curly-spacing': ['error', 'always'],
            'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
            'perfectionist/sort-exports': 'warn',
            'perfectionist/sort-named-exports': 'warn',
            'perfectionist/sort-imports': 'warn',
            'perfectionist/sort-named-imports': 'warn',
            'perfectionist/sort-modules': 'warn',
            semi: ['error', 'always']
        }
    }
);
