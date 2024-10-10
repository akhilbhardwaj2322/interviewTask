const { merge } = require('webpack-merge');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        filename: 'web-app.bundle.js',
        publicPath: "http://localhost:4000/",
        sourceMapFilename: '[name].js.map',
        path: __dirname + '/build',
    },
    devServer: {
        static: './dist',
        historyApiFallback: true,
    },
 });
 