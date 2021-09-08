/* eslint-disable */
const webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const NODE_MODULES = path.join(__dirname, '../node_modules');
const APP_DIR = path.join(__dirname, '../src');

module.exports = {
    mode: 'production',
    devtool: 'cheap-source-map',
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
                exclude: NODE_MODULES,
                include: APP_DIR,
            },
            {
                test: /\.(js|jsx)$/,
                exclude: NODE_MODULES,
                include: APP_DIR,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'main.[contenthash:8].css' }),
        new CleanWebpackPlugin(),
        new CopyPlugin({ patterns: [{ from: './src/resources/images', to: 'static/img/[name].[ext]' }] }),
        new WebpackManifestPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.ejs',
            templateParameters: { title: 'React Webpack' },
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false),
            BACKEND_URL: JSON.stringify('http://local.myshop4.com:5000'),
            MANAGER_URL: JSON.stringify('http://local.myshop4.com:8080'),
            CATALOG_URL: JSON.stringify('http://local.myshop4.com:9080'),
            WEBSITE_URL: JSON.stringify('https://myshop4.com'),
            FEATURE_IMAGE: JSON.stringify('https://dnhkjla6wv45e.cloudfront.net/destacados_wide.png'),
            REFRESH_TOKEN_INTERVAL : JSON.stringify(29),
            SESSION_EXPIRE_TIME    : JSON.stringify(900000),
            API_URL_OPENSTREETMAP  : JSON.stringify('https://nominatim.openstreetmap.org'),
            RECAPTCHA_KEY          : JSON.stringify('6LezIHcaAAAAANR7-E1bDROgX-d4PG28pNpZmwsr'),
            RECAPTCHA_THRESHOLD_SCORE: JSON.stringify(0.5),
            MAX_FILE_SIZE_MB          : JSON.stringify(10),
        }),
    ],
    optimization: {
        runtimeChunk: 'single',
        minimize: true,
        minimizer: [
            `...`,
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
        ],
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 20000,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                        )[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
    },
};
