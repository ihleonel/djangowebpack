var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: __dirname,

  entry: './src/index', // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs

  output: {
      path: path.resolve('./dist/'),
      filename: "app.js",
  },

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
    new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery'}),
    new MiniCssExtractPlugin({filename: '/app.css'}),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            MiniCssExtractPlugin.loader,
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
       test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
       exclude: [/img/],
       use: [{
         loader: 'file-loader',
         options: {
           name: '[name].[ext]',
           outputPath: 'fonts/',        // where the fonts will go
           publicPath: './fonts/'  // override the default path
         }
       }]
      },
      {
        test: /.(png|svg|jpe?g|gif)$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',   
            publicPath: './img/'
          }
        }]
       },
    ]
  }
}
