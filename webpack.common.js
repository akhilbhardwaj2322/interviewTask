const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    target: 'web',
    node: {
        __dirname: false,
        __filename: false,
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
        alias: {
            web: path.resolve(__dirname, 'src/')
        }
    },
    module: {
        rules: [
            {
                // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                },
            },
            { 
                test: /\.module\.scss$/, 
                use: [ 
                    { loader: "style-loader" },  // to inject the result into the DOM as a style block
                    { loader: "css-modules-typescript-loader"},  // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
                    { loader: "css-loader", options: { modules: true } },  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
                    { loader: "sass-loader" },  // to convert SASS to CSS
                    // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
                ],
            },
            {
                test: /\.(css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ],
            },
            {
                test: /\.(styl)$/,
                use: [
                    'style-loader',
                    'css-loader?sourceMap',
                    'stylus-loader?sourceMap&resolve url',
                ],
            },
            {
                test: /\.svg$/,
                oneOf: [
                    {
                        resourceQuery: /react/,
                        use: [
                            {
                                loader: "babel-loader"
                            },
                            {
                                loader: "react-svg-loader",
                                options: {
                                    svgo: {
                                        plugins: [
                                            { removeTitle: true },
                                        ],
                                        floatPrecision: 2,
                                    }
                                },
                            },
                        ],
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|png|ico|icns)$/,
                loader: 'file-loader',
                options: {
                    name: '[contenthash].[ext]',
                },
            },
            {
                test: /\.png$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.(eot|ttf|woff|woff2)(\?[0-9a-zA-Z\.=]+#)?$/,
                loader: 'file-loader',
                options: {
                    name: '[contenthash].[ext]'
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
        }),
        new HtmlWebpackPlugin({
            filename: 'PrivacyPolicy.html',
            template: path.resolve(__dirname, './src/PrivacyPolicy.html'),
        }),
        new HtmlWebpackPlugin({
            filename: 'TermsOfService.html',
            template: path.resolve(__dirname, './src/TermsOfService.html'),
        }),
    ],
};
