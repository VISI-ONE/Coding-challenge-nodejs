module.exports = {
    'env': {
        'node': true,
        'commonjs': true,
    },
    'extends': 'eslint:recommended',
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        },
        {
            'files': ['tests/**/*'],
            'env': {
                'jest': true
            }
        }
    ],
    'parserOptions': {
        'ecmaVersion': 'latest'
    },
    'rules': {
        'semi': ['error', 'always'],
        'quotes': ['error', 'single'],
        'no-unused-vars': ['error', { 'args': 'none' }],
    },
};
