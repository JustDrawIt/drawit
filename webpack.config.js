const HtmlWebPackPlugin = require('html-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    publicPath: '/',
  },
  devtool: isProd ? 'source-map' : 'inline-source-map',
  plugins: [
    new HtmlWebPackPlugin({
      template: './client/index.html',
      filename: '../public/index.html',
    }),
  ],
};
