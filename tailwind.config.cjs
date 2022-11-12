module.exports = {
  content: ["./**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  // @ts-ignore
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
