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
    output : {
        publicPath : 'https://dxrwwzn7ah5c8.cloudfront.net/',
    },
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
            PRODUCTION: JSON.stringify(true),
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
