const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    rules : [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    'targets': {
                      'node': '10'
                    }
                  }
                ],
                '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  watch: true,
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin(({
      template: './src/index.html',
    }))
  ]
};
module.exports = config;