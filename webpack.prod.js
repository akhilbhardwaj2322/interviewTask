const { merge } = require('webpack-merge');
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: '[contenthash].js',
        publicPath: "https://d1d81t5mhf4uem.cloudfront.net/web-app",
        sourceMapFilename: undefined,
        path: __dirname + '/build',
    },
    plugins: [
        sentryWebpackPlugin({
            authToken: process.env.SENTRY_AUTH_TOKEN,
            org: "nervex-neurotechnologies",
            project: "frontend",
        }),
    ],
 });
 