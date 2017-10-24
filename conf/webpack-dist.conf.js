const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('../package.json');

module.exports = {
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                enforce: 'pre'
            },
            {
                test: /.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(css|styl|stylus)$/,
                loaders: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader?minimize',
                        'stylus-loader',
                        'post-css-loader'
                    ]
                })
            },
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/, new RegExp(conf.paths.vendor)],
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: conf.path.src('index.html')
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { unused: true, dead_code: true, warnings: false }
        }),
        new ExtractTextPlugin('index-[contenthash].css'),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' })
    ],
    output: {
        path: path.join(process.cwd(), conf.paths.dist),
        filename: '[name]-[hash].js'
    },
    entry: {
        app: `./${conf.path.src('Main.jsx')}`,
        vendor: Object.keys(pkg.dependencies)
    }
};
