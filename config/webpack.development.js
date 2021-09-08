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
            BACKEND_URL               : JSON.stringify('http://localhost:5000'),
            MANAGER_URL               : JSON.stringify('http://localhost:8000'),
            CATALOG_URL               : JSON.stringify('http://localhost:9000'),
            WEBSITE_URL               : JSON.stringify('https://myshop4.com'),
            API_URL_OPENSTREETMAP     : JSON.stringify('https://nominatim.openstreetmap.org'),
            RECAPTCHA_KEY             : JSON.stringify('6LezIHcaAAAAANR7-E1bDROgX-d4PG28pNpZmwsr'),
            REFRESH_TOKEN_INTERVAL    : JSON.stringify(29),
            SESSION_EXPIRE_TIME       : JSON.stringify(900000),
            RECAPTCHA_THRESHOLD_SCORE : JSON.stringify(0.5),
            MAX_FILE_SIZE_MB          : JSON.stringify(10),
        }),
    ],
};
