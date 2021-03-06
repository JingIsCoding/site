const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.setupCSS = function(paths) {
  return {
    module: {
      loaders: [
//        { test: /\.less$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss?browsers=last 2 version!less?outputStyle=expanded&sourceMap' },
//        { test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss?browsers=last 2 version!sass?outputStyle=expanded&sourceMap' }
        { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true') }
      ]
    }
  };
}

exports.fonts = function(){
    return{
        module:{
                loaders:[
                {
                  test: /\.woff$/,
                  loader: 'url',
                  query: {
                    name: 'font/[hash].[ext]',
                    limit: 5000,
                    mimetype: 'application/font-woff'
                  }
                },
                {
                  test: /\.ttf$|\.eot$/,
                  loader: 'file',
                  query: {
                    name: 'font/[hash].[ext]'
                  }
                }
            ]
        }
    }
}

exports.images = function(path) {
    return{
        module:{
            loaders:[
                {
                  test: /\.(jpg|png)$/,
                  loader: 'url-loader?limit=10240'
                },
                {
                  test: /\.svg$/,
                  loader: 'raw'
                }
            ]
        }
    }
}

exports.babel = function() {
  return {
    module: {
        loaders: [
             {
                   test: /.jsx?$/,
                   loader: 'babel-loader',
                   exclude: /node_modules/,
                   query: {
                     presets: ['es2015', 'react', 'stage-0']
                   }
             }
        ]
    }
  };
}

exports.clean = function(path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        // Without `root` CleanWebpackPlugin won't point to our
        // project and will fail to work.
        root: process.cwd()
      })
    ]
  };
}

exports.extractBundle = function(options) {
  const entry = {};
  entry[options.name] = options.entries;

  return {
    // Define an entry point needed for splitting.
    entry: entry,
    plugins: [
      // Extract bundle and manifest files. Manifest is
      // needed for reliable caching.
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, 'manifest']
      })
    ]
  };
}

exports.minify = function() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  };
}
