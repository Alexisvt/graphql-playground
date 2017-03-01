// @flow
import { Configuration } from 'webpack';
import path from 'path';

const config: Configuration = {
  entry: path.resolve(__dirname, 'src/app/index'),
  output: {
    path: path.resolve(__dirname, 'src/public/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [{ loader: 'url-loader', options: { limit: 40000 } }, 'image-webpack-loader']
      }
    ]
  }
};

export default config;