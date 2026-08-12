/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#5B21B6",
          purpleDark: "#3B1268",
          violet: "#7C3AED",
          pink: "#EC4899",
          rose: "#F43F5E",
          cream: "#FFF8F3",
          ink: "#1F1330",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Sora", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #5B21B6 0%, #7C3AED 55%, #EC4899 100%)",
        "brand-gradient-soft": "linear-gradient(135deg, #F5EEFF 0%, #FDF1F7 100%)",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(91, 33, 182, 0.25)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
