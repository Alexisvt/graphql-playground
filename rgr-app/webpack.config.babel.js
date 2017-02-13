// @flow
import path from 'path';

export default ({
  entry: path.join(path.resolve('js'), 'app'),
  output: {
    path: path.resolve('public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          path.resolve('node_modules')
        ],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    ]
  },
  watch: true
});