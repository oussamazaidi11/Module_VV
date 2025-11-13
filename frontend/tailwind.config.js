// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // make sure React files are included
    // other paths
  ],
  theme: {
    extend: {
      // optional custom motionScale / timing etc.
    },
  },
  plugins: [
    require('tailwindcss-motion'),
  ],
};
