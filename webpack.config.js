var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BundleTracker = require('webpack-bundle-tracker');

var port = 8082;

module.exports = {
    port: port,
    devtool: 'eval',
    entry: {
        index: [
            'webpack-dev-server/client?http://0.0.0.0:' + port,
            'webpack/hot/only-dev-server',
            './frontend/index.js'
        ],
        style: [
            'webpack-dev-server/client?http://0.0.0.0:' + port,
            'webpack/hot/only-dev-server',
            './frontend/common.styl'
        ]
    },
    output: {
        path: path.join(__dirname, 'bundles'),
        filename: '[name].js',
        publicPath: 'http://localhost:' + port + '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new BundleTracker(),
        new webpack.DefinePlugin({
            __CONFIG__: JSON.stringify('debug')
        })
    ],
    resolve: {
        extensions: ['', 'styl', '.jsx',  '.js'],
        modulesDirectories: ['frontend', 'node_modules']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'frontend'),
            exclude: 'node_modules'
        }, {
            test: /\.json$/,
            loaders: ['json'],
            include: path.join(__dirname, 'frontend')
        }, {
            test: /\.styl$/,
            loaders: ['style', 'css', 'stylus'],
            include: path.join(__dirname, 'frontend')
        }, {
            test: /\.(png|jpg)$/,
            loaders: ['file'],
            include: path.join(__dirname, 'frontend')
        }]
    }
};
