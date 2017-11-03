const webpack = require('webpack');
const path = require('path');
const rupture = require('rupture');
const conf = require('./gulp.conf');

const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    module: {
        rules: [
            {
                test: /.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 }},
                    'postcss-loader'
                ]
            },
            {
                test: /\.styl$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    { loader: 'postcss-loader', options: { sourceMap: true }},
                    { loader: 'stylus-loader', options: { use: [rupture()] }}
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/, new RegExp(conf.paths.vendor)],
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ['node_modules']
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: conf.path.src('index.html')
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'source-map',
    output: {
        path: path.join(process.cwd(), conf.paths.tmp),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        'babel-polyfill',
        `./${conf.path.src('Main.jsx')}`
    ]
};
