module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        "@typescript-eslint/no-unused-vars": ["warn"]
    },
    overrides: [
        {
            files: ['test/**/*.spec.ts'],
            rules: {
                '@typescript-eslint/no-explicit-any': ['off']
            }
        }
    ]
};