module.exports = {
    root: false,
    extends: ['../../.eslintrc.js'],
    parserOptions: {
        project: './tsconfig.json',
    },
    settings: {
        'import/resolver': {
            typescript: {
                project: './tsconfig.json',
            },
        },
    },
    ignorePatterns: ['.eslintrc.js', 'dist'],
}; 