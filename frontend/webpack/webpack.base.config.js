var path = require('path')

module.exports = {

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },

  resolve: {
    modules: [
      path.join(__dirname, 'frontend/src/js'),
      'node_modules'
    ],
    extensions: ['.js', '.jsx']
  }
};