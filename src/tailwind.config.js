tailwind.config = {
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                'sm': '640px',
                // => @media (min-width: 640px) { ... }

                'md': '768px',
                // => @media (min-width: 768px) { ... }

                'lg': '1024px',
                // => @media (min-width: 1024px) { ... }

                'xl': '1280px',
                // => @media (min-width: 1280px) { ... }

                '2xl': '1536px',
                // => @media (min-width: 1536px) { ... }
            },
        },
        extend: {
            screens: {
                'extraSm': '400px',
                // => @media (min-width: 400px) { ... }

                'tablet': '1000px',
                // => @media (min-width: 1040px) { ... }

                'lg': '1180px',
                // => @media (min-width: 1180px) { ... }

                '3xl': '1920px',
                // => @media (min-width: 1920px) { ...
            },

            gridAutoFlow: {
                'row': 'row',
            },

            zIndex: {
                '999': '999',
            },

            fontFamily: {
                'sans': ['Inter', 'sans-serif'],
                'serif': ['Merriweather', 'serif'],
                'mono': ['Fira Code', 'monospace'],
                'kalam': ['Kalam', 'cursive'],

                'body': ['Inter', 'sans-serif'],
                'Kanit': ['Kanit', 'sans-serif'],
            },
        },
    },
}