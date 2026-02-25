/** @type {import('tailwindcss').config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        screens: {
            sm: '795px',
        },
        extend: {},
    },
    plugins: [],
}