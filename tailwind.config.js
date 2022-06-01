const colors = require('tailwindcss/colors')

module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    darkMode: "class",
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            slate: colors.slate,
            cyan: colors.cyan,
            gray: colors.gray,
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
        display: ['responsive', 'hover', 'focus', 'active', 'group-hover', 'group-focus'],
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/forms')
    ],
}
