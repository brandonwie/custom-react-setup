import path from 'path';
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
//create css file per js file: https://webpack.kr/plugins/mini-css-extract-plugin/
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const isDevelopment = process.env.NODE_ENV !== 'production';

const plugins: webpack.WebpackPluginInstance[] = [
  new HTMLWebpackPlugin({
    template: './public/index.html',
  }),
];
isDevelopment
  ? plugins.push(new ReactRefreshWebpackPlugin())
  : plugins.push(new MiniCssExtractPlugin());

const config: webpack.Configuration = {
  mode: isDevelopment ? 'development' : 'production',
  devServer: {
    hot: true,
    port: 3000,
  },
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    // more configurations: https://webpack.js.org/configuration/
  },
  plugins,
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    // automatically resolve certain extensions (Ex. import './file' will automatically look for file.js)
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
    alias: {
      // absolute path importing files
      '@pages': path.resolve(__dirname, './src/pages'),
    },
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
          // for Tailwind CSS
          'postcss-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
};

export default config;
