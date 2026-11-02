/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {
            fontFamily: {
                kanit: ["Kanit", "sans-serif"],
                bebas: ["Bebas Neue", "serif"],
                poppins: ["Aspekta ", "serif"],
                quicksand: ["Quicksand", "sans-serif"],
                sans: ["Quicksand", "sans-serif"],
            },
            colors: {
                azul: "#224483",
                negro: "#242424",
                primary: "#1b3f90",
                accent: "#b8cf38",
                secondary: "#82cbe8",
                dark: "#1c2442",
            },
            padding: {
                primary: "5%",
            },

            // Puedes agregar personalizaciones aquí si es necesario
        },
    },
    plugins: [
        require("tailwindcss-animated"),
        function ({ addUtilities }) {
            const newUtilities = {
                ".scrollbar-hide": {
                    /* IE and Edge */
                    "-ms-overflow-style": "none",

                    /* Firefox */
                    "scrollbar-width": "none",

                    /* Safari and Chrome */
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                },
                ".text-gradient": {
                    background:
                        "linear-gradient(to bottom, #ffffff, #82cbe8)",
                    "-webkit-background-clip": "text",
                    "-webkit-text-fill-color": "transparent",
                    "background-clip": "text",
                    display: "inline-block",
                },

            };

            addUtilities(newUtilities);
        },
        // Otros plugins si los tienes
    ],
};
