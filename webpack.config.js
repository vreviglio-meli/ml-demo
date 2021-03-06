const path = require('path');
const { readdirSync, existsSync } = require('fs');

const entries = {};

readdirSync('./packages').forEach((packageName) => {
  const index = `./packages/${packageName}/index.js`;
  if (existsSync(index) && packageName !== 'all') {
    entries[`../packages/${packageName}/build/index`] = index;
  }
});

module.exports = {
  entry: entries,
  output: {
    libraryTarget: 'commonjs2',
    library: '[name]',
    path: path.join(path.resolve('.'), './build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      }
    ]
  }
}