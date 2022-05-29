const colors = require('tailwindcss/colors')

module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            slate: colors.slate,
            cyan: colors.cyan,
            pink: colors.pink,
            yellow: colors.yellow,
        },
        fontFamily: {
            'proxima-nova': ['Proxima Nova', 'sans-serif']
        }
    },
    variants: {
        backgroundColor: ['responsive', 'hover', 'focus', 'active'],
        borderColor: ['responsive', 'hover', 'focus', 'active'],
        textColor: ['responsive', 'hover', 'focus', 'active'],
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/forms')
    ],
}
