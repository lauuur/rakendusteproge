const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  mode: "production",
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/bundle.js'
  },
  plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin([
        {
          from: "public/index.html",
        }
      ]),
      new CopyPlugin([
        {
          from: "public/pics",
          to: "static/pics"
        }
      ])
    ],
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   options: {
      //     failOnError: false,
      //   },
      // },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
            options:{
              outputPath: "static/fonts"
            }
          },
        ],
      },
      { 
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader' 
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    compress: true,
    port: 9000,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
};