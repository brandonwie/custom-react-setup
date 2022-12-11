module.exports = {
  // didn't add autoprefixer because it is already included in postcss-preset-env
  plugins: [require('tailwindcss'), require('postcss-preset-env')],
};
