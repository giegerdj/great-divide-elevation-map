const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './resources/js/app.js',
    libs: './resources/js/libs.js',
    style: './resources/less/app.less'
  },
  output: {
    path: path.resolve(__dirname, 'public/assets/build'),
    filename: 'js/[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'resources/assets',
          to: '../assets',
          noErrorOnMissing: true
        }
      ]
    })
  ]
};