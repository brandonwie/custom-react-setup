const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // more configurations: https://webpack.js.org/configuration/
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin(), // for hot reloading
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                [
                  'postcss-preset-env',
                  {
                    // more options: https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i, // .sass or .scss
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
};
