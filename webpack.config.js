var path = require("path");
var webpack = require('webpack');
var SRC_DIR = path.join(__dirname, 'client/src');
var DIST_DIR = path.join(__dirname, 'client/dist');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

 module.exports = {
     entry: `${SRC_DIR}/index.jsx`,
     output: {
         path: DIST_DIR,
         filename: 'bundle.js'
     },
     module: {
         rules: [
             {
                 test: /\.jsx?/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015', 'react']
                 }
             },
             {
                test: /\.scss$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: "css-loader" // translates CSS into CommonJS
                            },
                            {
                                loader: "sass-loader" // compiles Sass to CSS
                            }
                        ],
                        fallback: "style-loader" // used when css not extracted
                    }
                ))
            },
         ],
     },
     plugins: [
       new webpack.NamedModulesPlugin(),
       // prints more readable module names in the browser console on HMR updates

       new ExtractTextPlugin({filename: 'styles.css', allChunks: true})
     ],
     devtool: 'source-map',
     resolve: {
   modules: [
     path.join(__dirname, "src"),
     "node_modules"
   ]
  }
 };
