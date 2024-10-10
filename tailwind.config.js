module.exports = {
    content: [
        './src/**/*.tsx',
        'node_modules/daisyui/dist/**/*.js',
        'node_modules/react-daisyui/dist/**/*.js'
    ],
    theme: {
        fontSize: {
            'xs': '.75rem',
            'sm': '.875rem',
            'base': '1rem',
            'lg': '1.125rem',
            'xl': '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem'
        },
        extend: {
            colors: {
                primary: '#0369a1',
                background : '#F1F1F1',
                thmBlue: '#26818E'
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('daisyui')],
}
