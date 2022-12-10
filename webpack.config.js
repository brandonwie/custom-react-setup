const path = require('path');
const webpack = require('webpack');
// const HTMLWebpackPlugin = require('html-webpack-plugin');
//create css file per js file: https://webpack.kr/plugins/mini-css-extract-plugin/
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

const plugins = [
  // new HTMLWebpackPlugin({
  //   template: 'index.html',
  // }),
];
isDevelopment
  ? plugins.push(new ReactRefreshWebpackPlugin())
  : plugins.push(new MiniCssExtractPlugin());

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devServer: {
    hot: true,
    port: 4000,
  },
  entry: './src/index.tsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    // more configurations: https://webpack.js.org/configuration/
  },
  plugins,
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
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [
                isDevelopment && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/i, // .sass or .scss
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          {
            // for Tailwind CSS
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
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
};
