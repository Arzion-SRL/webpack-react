/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const APP_DIR = path.join(__dirname, '../src');
const NODE_MODULES = path.join(__dirname, '../node_modules');

module.exports = {
    mode      : 'development',
    devtool   : 'eval-source-map',
    devServer : {
        contentBase        : path.resolve(__dirname, '../dist'),
        historyApiFallback : { disableDotRule: true, },
        hot                : true,
        host               : 'localhost',
        port               : 8000,
        open               : 'firefox',
        overlay            : {
            warnings : true,
            errors   : true,
        },
    },
    module: {
        rules: [
            {
                test    : /\.(less|css)$/,
                use     : ['style-loader', 'css-loader', 'less-loader'],
                exclude : NODE_MODULES,
                include : APP_DIR,
            },
            {
                test    : /\.(js|jsx)$/,
                exclude : NODE_MODULES,
                include : APP_DIR,
                use     : [
                    {
                        loader  : require.resolve('babel-loader'),
                        options : { plugins: [require.resolve('react-refresh/babel')] },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
        new CopyPlugin({ patterns: [{ from: './src/resources/images', to: 'static/img/[name].[ext]' }] }),
        new HtmlWebpackPlugin({ template: './public/index.ejs' }),
        new webpack.DefinePlugin({
            PRODUCTION                : JSON.stringify(false),
        }),
    ],
};
