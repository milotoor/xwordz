
const conf = require('./gulp.conf');


module.exports = {
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, RegExp(conf.paths.vendor)],
                loader: 'eslint'
            }
        ],

        loaders: [
            {
                test: /\.(styl)$/,
                loaders: [
                    'style',
                    'css',
                    'stylus?paths=node_modules'
                ]
            },
            {
                test: /.json$/,
                loaders: [
                    'json'
                ]
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/, RegExp(conf.paths.vendor)],
                loaders: [
                    'babel'
                ]
            }
        ]
    },
    plugins: [],
    debug: true,
    devtool: 'source-map',
    externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    }
};
