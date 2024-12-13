module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        pulse: "pulse 1.5s ease infinite",
        shimmer: "shimmer 3s infinite linear",
        bounce_gentle: "bounce 2s infinite",
        ping_slow: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        pulse: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.1)", opacity: "0.7" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(200%)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
  ],
};
