module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: __dirname,
    filename: './dist/main.js',
  },
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
        use: 'file-loader',
      },
    ],
  },
};
