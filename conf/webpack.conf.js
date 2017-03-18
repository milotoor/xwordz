const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');


module.exports = {
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/, RegExp(conf.paths.vendor)],
                loader: 'eslint'
            }
        ],

        loaders: [
            {
                test: /.json$/,
                loaders: [
                    'json'
                ]
            },
            {
                test: /\.(css)$/,
                loaders: [
                    'style',
                    'css'
                ]
            },
            {
                test: /\.(styl)$/,
                loaders: [
                    'style',
                    'css',
                    'stylus?paths=node_modules'
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/, RegExp(conf.paths.vendor)],
                loaders: [
                    'babel'
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: conf.path.src('index.html')
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    postcss: () => [autoprefixer],
    debug: true,
    devtool: 'source-map',
    output: {
        path: path.join(process.cwd(), conf.paths.tmp),
        filename: 'index.js'
    },
    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        'babel-polyfill',
        `./${conf.path.src('index')}`
    ]
};
