/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Add custom colors here
        // primary: {
        //   50: '#f0f9ff',
        //   ...
        //   900: '#0c4a6e',
        // },
      },
      fontFamily: {
        // sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        // 'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        // fadeIn: {
        //   '0%': { opacity: '0' },
        //   '100%': { opacity: '1' },
        // },
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
};
