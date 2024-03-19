module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    root: true,
    env: {
        es6: true,
        node: true,
        jest: true
    },
    ignorePatterns: ['.eslintrc.cjs', 'vite.config.ts'],
    rules: {
        'no-var': 'error',
        semi: 'error',
        'no-multi-spaces': 'error',
        'space-in-parens': 'error',
        'no-multiple-empty-lines': 'error',
        'prefer-const': 'error',
        'no-unused-vars': 'off',
        'no-case-declarations': 'off',
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto'
            }
        ],
        '@typescript-eslint/no-explicit-any': ['off'],
        '@typescript-eslint/no-var-requires': ['off']
    }
};
