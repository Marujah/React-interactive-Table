var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/InteractiveTable.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: "file-loader?name=/src/assets/images/[name].[ext]"
      },
      {
        test: /\.css$/,
        use: [
            {
                loader: "style-loader"
            },
            {
                loader: 'css-loader',
                options: {url: false}
            }
        ]
      }
    ]
  },
  externals: {
    'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
  }
};