import * as path from 'path';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import merge from 'webpack-merge';

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const pkg = require('./package.json');

const TARGET = process.env.npm_lifecycle_event || '';
const ROOT_PATH = __dirname;
const config = {
  paths: {
    readme: path.join(ROOT_PATH, 'README.md'),
    dist: path.join(ROOT_PATH, 'dist'),
    src: path.join(ROOT_PATH, 'src'),
    docs: path.join(ROOT_PATH, 'docs')
  },
  filename: 'boilerplate',
  library: 'Boilerplate'
};

process.env.BABEL_ENV = TARGET;

const common = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css', '.png', '.jpg']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loaders: ['eslint-loader'],
        include: [
          config.paths.docs,
          config.paths.src
        ]
      },
      {
        test: /\.md$/,
        loaders: ['@catalog/markdown-loader', 'raw-loader']
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=100000&mimetype=image/png',
        include: config.paths.docs
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader',
        include: config.paths.docs
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        include: path.join(ROOT_PATH, 'package.json')
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ options: {} }),
  ]
};

const siteCommon = {
  plugins: [
    new HtmlWebpackPlugin({
      template: require('html-webpack-template'), // eslint-disable-line global-require
      inject: false,
      mobile: true,
      title: pkg.name,
      appMountId: 'app'
    }),
    new webpack.DefinePlugin({
      NAME: JSON.stringify(pkg.name),
      USER: JSON.stringify(pkg.user),
      VERSION: JSON.stringify(pkg.version)
    })
  ]
};

if (TARGET === 'start') {
  module.exports = merge(common, siteCommon, {
    devtool: 'eval-source-map',
    entry: {
      docs: [config.paths.docs]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"'
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader']
        },
        {
          test: /\.(js|jsx)$/,
          loaders: ['babel-loader?cacheDirectory'],
          include: [
            config.paths.docs,
            config.paths.src
          ]
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      host: process.env.HOST,
      port: process.env.PORT,
      stats: 'errors-only'
    }
  });
}

if (TARGET === 'gh-pages' || TARGET === 'gh-pages:stats') {
  module.exports = merge(common, siteCommon, {
    entry: {
      app: config.paths.docs,
      vendors: [
        'react',
        'react-dom'
      ]
    },
    output: {
      path: path.resolve(ROOT_PATH, './gh-pages'),
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js'
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin('[name].[chunkhash].css'),
      new webpack.DefinePlugin({
        // This affects the react lib size
        'process.env.NODE_ENV': '"production"'
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /\.(js|jsx)$/,
          loaders: ['babel-loader'],
          include: [
            config.paths.docs,
            config.paths.src
          ]
        }
      ]
    }
  });
}

const distCommon = {
  devtool: 'source-map',
  output: {
    path: config.paths.dist,
    libraryTarget: 'umd',
    library: config.library
  },
  entry: config.paths.src,
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: config.paths.src,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  plugins: [
  ]
};

if (TARGET === 'dist') {
  module.exports = merge(distCommon, {
    output: {
      filename: `${config.filename}.js`
    }
  });
}

if (TARGET === 'dist:min') {
  module.exports = merge(distCommon, {
    output: {
      filename: `${config.filename}.min.js`
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({ options: {} }),
    ]
  });
}

if (!TARGET) {
  module.exports = common;
}
