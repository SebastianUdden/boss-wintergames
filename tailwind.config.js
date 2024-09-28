/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "pirate-map": "url('/backgrounds/maps/pirate-map-background.png')",
        "pirate-village": "url('/backgrounds/pirate-village-background.webp')",
        "wheel-of-fortune": "url('/backgrounds/wheel/wheel-of-fortune.png')",
      },
      fontFamily: {
        // Add Pirata One and IM Fell English as custom fonts
        pirata: ['"Pirata One"', "serif"],
        fell: ['"IM Fell English"', "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
    },
  },
  plugins: [require("tailwindcss-animate")],
};
